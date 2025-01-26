#!/bin/bash
set -e  # Exit on first error

PROJECT_ROOT=$(pwd)

# [SECTION]: Setting Root Credentials & Database Name
    echo "Setup Database locally ?: [Y/n] "
    read setupDBLocally

    if [ "$setupDBLocally" = "y" ] || [ "$setupDBLocally" = "Y" ]; then
        echo "Enter the MySQL root password:"
        read -s MYSQL_ROOT_PASSWORD

        echo "Re-enter the MySQL root password for verification:"
        read -s VERIFICATION_MYSQL_ROOT_PASSWORD

        if [ "$MYSQL_ROOT_PASSWORD" != "$VERIFICATION_MYSQL_ROOT_PASSWORD" ]; then
            echo "Error: The passwords do not match. Please try again."
            exit 1
        fi

        echo "Enter The name of the Database:"
        read MYSQL_DATABASE
    fi
# [END-SECTION]


# [SECTION]: Getting Node-20 (with NPM) and MySQL-8 Installation files/APT repos
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

    # Add the MySQL APT repository using curl
    if [ "$setupDBLocally" = "y" ] || [ "$setupDBLocally" = "Y" ]; then
        curl -LO https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb

        # Install the APT configuration package
        sudo dpkg -i mysql-apt-config_0.8.24-1_all.deb

        # During installation, choose MySQL 8.0 in the configuration screen
        # If not prompted, reconfigure the package
        sudo dpkg-reconfigure mysql-apt-config

        sudo rm "mysql-apt-config_0.8.24-1_all.deb"

        sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B7B3B788A8D3785C
    fi
    
    sudo apt-get update
# [END-SECTION]


# [SECTION]: Installing all needed packages
    # Install required packages
    sudo apt-get install -y nodejs nginx libreoffice
    if [ "$setupDBLocally" = "y" ] || [ "$setupDBLocally" = "Y" ]; then
        sudo apt-get install -y mysql-server
    fi
# [END-SECTION]

# [SECTION]: Setting up the database and privileges
    
    if [ "$setupDBLocally" = "y" ] || [ "$setupDBLocally" = "Y" ]; then
        # Configure MySQL
        sudo service mysql start  # Start the MySQL service

        # Set the root password and create the database
        mysql -p -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}'; FLUSH PRIVILEGES; CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};"
    fi
# [END-SECTION]

# [SECTION]: Setting up NPM packages
    # Install Node.js dependencies

    # For Developement
    npm install -D typescript
    npm install -g pm2


    npm install --production

    cd "$PROJECT_ROOT"
# [END-SECTION]

# Generate Prisma client
# npx prisma generate

# [SECTION]: Setting up Certbot (For Nginx)
    sudo apt install -y python3 python3-venv libaugeas0
    sudo python3 -m venv /opt/certbot/
    sudo /opt/certbot/bin/pip install --upgrade pip
    sudo /opt/certbot/bin/pip install certbot certbot-nginx
    sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

    # in One Click:
    sudo certbot --nginx
    # Manually configuring
    # sudo certbot certonly --nginx
    echo "Activate reneweal automation for Certbot ? [Y/n] "
    read renewCertbot
    if [ "$renewCertbot" = "y" ] || [ "$renewCertbot" = "Y" ]; then
        echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && sudo certbot renew -q" | sudo tee -a /etc/crontab > /dev/null;
    fi

    # to remove the certificate:
    # sudo certbot delete --cert-name <your-domain.com>
# [END-SECTION]


# [SECTION]: Setting up NGINX
    # Set up Nginx configuration
    # (Assuming you have an Nginx configuration file to copy)

    # Getting Domain and Server configuration:
    echo "Enter The domain name:"
    read domain_name

    echo "Enter The Address (w/ Protocol) of the server:"
    read server_addr

    echo "Enter The Internal Port of the server:"
    read server_port

    NGINX_CONF="/etc/nginx/nginx.conf"

    sed -e "s|<domain-name>|$domain_name|g" -e "s|<server-addr>|$server_addr|g" -e "s|<server-port>|$server_port|g" "$PROJECT_ROOT/nginx.conf" > "${NGINX_CONF}"

    # sudo useradd --system --no-create-home --shell /bin/false nginx

    # sudo chown -R nginx:nginx /var/log/nginx
    # sudo chown -R nginx:nginx /usr/share/nginx
    # sudo chown -R nginx:nginx /etc/nginx

    # [NO IDEA ABOUT WHAT THESE DO]
    # sudo unlink /etc/nginx/sites-enabled/default
    # sudo vim /etc/nginx/sites-available/reverse-proxy

    sudo service nginx restart  # Restart Nginx to apply the new configuration
# [END-SECTION]

# [SECTION]: Install Front-End files & Build
    cd client
    npm i
    export NODE_OPTIONS="--max-old-space-size=1024"
    npm run build
# [END-SECTION]

# [SECTION]: Monitoring Logs

# Built-in Tail (one)
# tail -f /path/to/file.log

# Multi-tail (multiple)
# sudo apt-get install multitail
# multitail /path/log1.log /path/log2.log

# [END-SECTION]

# Set CaseSentive to "false" for MySQL
# Apply migrations
cd $PROJECT_ROOT
echo "-> Start By running: pm2 start ecosystem.config.js --env development/production"

# [SECTION]: Nginx-Worker file access problem

# for Nginx problem (permission denied)
# -> change www-user to "ubuntu/current_username"

# [END-SECTION]

# [SECTION]: MISC

# Incase you mistakenly screwed up the directories

# sudo find /path/to/directory -type d -exec chmod 755 {} \;
# sudo find /path/to/directory -type f -exec chmod 644 {} \;

# [END-SECTION]


# npx prisma migrate dev
# Edit Mondial Relay error

# Start your Express application

echo "Setup completed successfully!"
