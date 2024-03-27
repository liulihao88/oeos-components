set -o nounset
set -o errexit

if [[ "$#" != 0 && "$1" == "-k" ]]; then
    echo
else
    npm run docsbuild
fi

# for i in {33..35};do
for i in 100;do
   echo "upload front-tenant to 10.0.11.$i"
   ssh  root@10.0.11."$i" <<EOF
   rm -rf /home/liulihao/oct-web-project-components-vue3/dist
EOF
   scp -r ./docs/.vitepress/dist  root@10.0.11."$i": /home/liulihao/oct-web-project-components-vue3/
   ssh root@10.0.11."$i" systemctl restart nginx
done
