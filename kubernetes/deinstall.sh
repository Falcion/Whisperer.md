#!/bin/bash

# Remove kubectl
if command -v kubectl &>/dev/null; then
	echo "Removing kubectl..."
	sudo rm "$(which kubectl)" # Quote the command substitution to prevent word splitting
else
	echo "kubectl not found. Skipping..."
fi

# Remove Kubernetes
echo "Removing all Kubernetes data..."
sudo kubeadm reset -f
sudo rm -rf /etc/kubernetes/ /var/lib/etcd /var/lib/kubelet /var/lib/kubernetes/ ~/.kube/

echo "Kubernetes has been fully removed."
