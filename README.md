
# News lazy loading

## 1. Project structure

/server - server part (`Json Server` + `Casual` random data generator)
<br> 
/client - client part (Angular) 
## 2. Server

#### 2.1 Setup

To run server part, install it locally with all dependencies using npm:

```
$ npm install
```

#### 2.2 Creating random data and starting server
First of all run this command to generate data for json server (with `casual` npm package)
```
$ npm run generate-data
```
`db.json` will be generated in server directory

Run this command to start server
```
$ npm run json-serv
```

server works on http://localhost:3000
<br/>
#### 2.3 news API
get news <br>
get http://localhost:3000/news

<br>

get news item <br>
get http://localhost:3000/news/${id}

<br>

update news item <br>
patch http://localhost:3000/news/${id}

<br>

get most liked news items, not equals id<br>
get http://localhost:3000/news?_limit=4&_sort=likes&_order=desc&id_ne=${id}
# 3. Client

#### 3.1 Start

To run client part, install it locally with all dependencies using npm:

```
$ npm install
```

Angular CLI must be installed globally by following command:
```
$ npm install -g @angular/cli
```
#### 3.2 Development server

Run `ng serve` for a dev server.

```
$ ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
<br>
<br>
Note: Project uses remote resources (like images and icons), so internet connection should be established.