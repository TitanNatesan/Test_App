# VPS Deployment Guide (Docker)

This guide explains how to deploy the **References Global Researcher Network** application to a Linux VPS (Ubuntu/Debian recommended) using Docker.

## 1. Prepare your VPS

### Install Docker and Docker Compose
Run the following commands on your VPS to install the latest Docker engine:

```bash
# Update package index
sudo apt-get update

# Install dependencies
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 2. Transfer Code to VPS

You can use **Git** (recommended) or **SCP**.

### Option A: Via Git
```bash
git clone <your-repository-url>
cd references---global-researcher-network
```

### Option B: Via SCP (from your local machine)
```bash
scp -r . user@your-vps-ip:/home/user/app
```

## 3. Configure Production Environment

### Update `docker-compose.yml`
On the VPS, edit the `docker-compose.yml` to set secure passwords and the correct API URL.

```bash
nano docker-compose.yml
```

**Key changes for production:**
1.  **DB_PASSWORD**: Change `yourpassword` to something secure.
2.  **VITE_API_URL**: 
    -   If your VPS has a domain: `https://api.yourdomain.com/api/preregister`
    -   If using IP: `http://your-vps-ip:8080/api/preregister`
3.  **ADMIN_PASSWORD**: Set a strong password for the admin dashboard.

## 4. Build and Deploy

Run the following command in the project root:

```bash
sudo docker compose up -d --build
```

The `-d` flag runs the containers in "detached" mode (background).

## 5. Reverse Proxy & SSL (Highly Recommended)

To use a domain name and HTTPS, you should use **Nginx** and **Certbot** on the host machine.

### Install Nginx
```bash
sudo apt install nginx
```

### Configure Nginx for Frontend and API
Create a new config file: `sudo nano /etc/nginx/sites-available/app`

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Admin access within frontend is handled by React Router,
    # so proxying / to localhost:3000 covers it.

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the config and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Install SSL with Certbot
```bash
sudo apt install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 6. Maintenance

-   **View Logs**: `sudo docker compose logs -f`
-   **Stop App**: `sudo docker compose down`
-   **Update App**: 
    ```bash
    git pull
    sudo docker compose up -d --build
    ```

## 7. Security Notes
-   Ensure your VPS firewall (UFW) allows ports 80 and 443.
-   Consider closing port 5432 (Postgres) to external traffic; Docker containers communicate internally over the `app-network`.
