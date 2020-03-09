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
wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R366/2020-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2020.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2019-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2019.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2018-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2018.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2017-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2017.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2015-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2015.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2014-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2014.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2013-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2013.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R366/2012-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2012.json

wget -c "https://api.opensensorweb.de/v0/search/measurements?measuredproperty=Concentration&uom=%C2%B5g/m%C2%B3&interval=R365/2011-01-01/P1D&bbox=-180,-85,180,85&substance=Particulate%20Matter%20with%20a%20diameter%20less%20than%2010%C2%B5m%20(PM10)&agg=mean&interpolator=LINEAR" -O measurements-2011.json

```
