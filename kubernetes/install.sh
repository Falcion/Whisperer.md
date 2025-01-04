#!/bin/bash

echo "Starting Kubernetes installation on Linux..."
echo "==========================================="

# Step 1: Update system packages and install dependencies
echo "Updating system packages..."
sudo apt-get update -y

echo "Installing required packages..."
sudo apt-get install -y apt-transport-https ca-certificates curl

# Step 2: Install Docker
echo "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Step 3: Install Kubernetes tools (kubeadm, kubelet, kubectl)
echo "Adding Kubernetes apt repository..."
sudo curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo bash -c 'cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF'
sudo apt-get update -y

echo "Installing kubeadm, kubelet, and kubectl..."
sudo apt-get install -y kubelet kubeadm kubectl

# Step 4: Hold the versions of Kubernetes tools
echo "Holding the versions of kubeadm, kubelet, and kubectl..."
sudo apt-mark hold kubelet kubeadm kubectl

# Step 5: Enable and start Docker
echo "Enabling and starting Docker..."
sudo systemctl enable docker
sudo systemctl start docker

# Step 6: Disable swap (required by Kubernetes)
echo "Disabling swap..."
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Step 7: Initialize the Kubernetes cluster using kubeadm
echo "Initializing Kubernetes cluster with kubeadm..."
sudo kubeadm init --pod-network-cidr=192.168.0.0/16

# Step 8: Set up kubeconfig for the root user
echo "Setting up kubeconfig for the root user..."
mkdir -p "$HOME"/.kube
sudo cp -i /etc/kubernetes/admin.conf "$HOME"/.kube/config
sudo chown "$(id -u):$(id -g)" "$HOME"/.kube/config

# Step 9: Install a pod network (using Calico as an example)
echo "Installing Calico network..."
kubectl apply -f https://docs.projectcalico.org/v3.20/manifests/calico.yaml

echo "Kubernetes installation complete."
echo "================================"
