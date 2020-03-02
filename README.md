# demo-hazard-map

This is an interactive web app, which displays current global hazard information and gives feedback about the influence on assets.

Deploy the application as _github page_.

```bash
rm -rf node_modules/gh-pages/.cache
npm run deploy
```

### Developer

The repository is based on the [create-react-app](https://github.com/facebook/create-react-app) build system.

### Fetching data

Example Requests:

```
wget -c "https://api.sensorhub-test.pikobytes.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2017-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&max_sampling=PT1H&interpolator=LINEAR" -O measurements-2017.json
```
