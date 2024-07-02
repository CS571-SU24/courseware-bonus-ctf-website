build
```
npm run build
docker build . -t ctnelson1997/cs571-su24-bonus
docker push ctnelson1997/cs571-su24-bonus
```


deploy
```
docker pull ctnelson1997/cs571-su24-bonus
docker run --name=cs571_su24_bonus  -d --restart=always -p 38823:80 ctnelson1997/cs571-su24-bonus
```
