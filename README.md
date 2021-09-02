[![namah](https://raw.githubusercontent.com/ericodess/namah/master/.github/images/project-thumbnail.png)](https://ericodess.github.io/namah)

# namah

### tl;dr

 ```
git clone https://github.com/ericodess/namah.git
cd namah/
npm install
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app. The initial structure of your app is setup. You may need to add a few `.env` variables read **Adding environment variables** for more.

### Adding environment variables

Most instances will need an back-end source in order to work a great way to provide it is to get started with [portfolio-api](https://github.com/ericodess/portfolio-api).

Also in this project there's blob resource which until at some instance it's public (only GET methods) due to the current CORS policy, after creating this resources add these environment variables:

```
REACT_APP_BACK_END_HOST={YOUR-BACK-END-ADDRESS}
REACT_APP_BLOB_HOST={YOUR-BLOB-ADDRESS}
```

PS. The `REACT_APP_BLOB_HOST` public address is: https://namahaassetdev.blob.core.windows.net

Now you are ready to use the project, just issue a `npm start` and you're good to go

## About the Project

Firstly this project was coding interview, but as a finished what was asked i saw a really good oportunity to train my full-stack skills.

1. If you wish to know more about this coding interview:

    [Desktop desired design](https://www.figma.com/file/2Ps9ytPtSfQIKynIDW1pqC/Teste-Big-Bang-Shop?node-id=0%3A1) 

    [Mobile desired design](https://www.figma.com/file/K8HLlUcdJMqUQMXS2iQVLV/Teste-Big-Bang-Shop-Mobile?node-id=0%3A1)


## [Documentation](https://github.com/ericodess/namah/wiki)

https://github.com/ericodess/namah/wiki

## Development

Install dependencies:

```sh
npm install
```

```sh
npm start
```
