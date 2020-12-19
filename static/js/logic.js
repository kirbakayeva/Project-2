//json lookup
// var jsontarget = "https://raw.githubusercontent.com/jebreensa/Project-2_Group12/main/Output/DrugData_local.json"
var jsontarget = "/api/v1.0/alldrugs"

// default values. Need to populate otherwise everything breaks
var stateselect1 = "US"
var stateselect2 = "US"
var Yearselect2 = "2016"
var stateselect3 = "US"
var Yearselect3 = "2016"
var drugselect = "Cocaine"
var yearselect4 = "2016"
var drugselect5 = "Cocaine"
var yearselect5 = "2016"

function changegraph1()
{
    var stateselect1 = document.getElementById("list").value;
    console.log(stateselect1);

Plotly.d3.json(jsontarget, function(err, rows){
  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  var data1 = [{
      type: 'scatter',
      mode: 'lines+markers',
      x: unpack(rows, 'year'),
      y: unpack(rows, 'death_count'),
      transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'state'),
        // defined by a dropdown
        operation: '=',
        // value: "US"
        value: stateselect1
        },
        {
        type: 'groupby',
        groups: unpack(rows, 'drug_name'),
        styles: [
          {target: 'Cocaine ', value: {marker: {color: 'red'}}},
          {target: 'Heroin ', value: {marker: {color: 'blue'}}},
          {target: 'Methadone', value: {marker: {color: 'orange'}}},
          {target: 'Opioids ', value: {marker: {color: 'green'}}},
          {target: 'Prescription Opioids', value: {marker: {color: 'brown'}}},
          {target: 'Psychostimulants ', value: {marker: {color: 'purple'}}}
        ]
        },
        {
            type: 'aggregate',
            groups: unpack(rows, 'year'),
            aggregations: [
            {target: 'y', func: 'avg'},
            ]
        }]
    }]

    var layout1 = {
      // title: "Accumulated Drug Deaths in the United States, 2016 - 2019",
      // tick rate determines year
      xaxis: {
        title: "<b>Year</b>",
        tickmode: "linear",
        tick0: 2016,
        dtick: 1
      },
      yaxis: { title: "<b>Total Deaths</b>"},
      // paper_bgcolor:"#F1F1F1"
    }

    Plotly.newPlot('plot1', data1, layout1)

});

}
changegraph1();

function changegraph2()
{
    var stateselect2 = document.getElementById("list2").value;
    var Yearselect2 = document.getElementById("list3").value;
    console.log(stateselect2);
    console.log(Yearselect2);

      Plotly.d3.json(jsontarget, function(err, rows){
        function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }
    var data2 = [{
        type: 'bar',
        x: unpack(rows, 'drug_name'),
        y: unpack(rows, 'death_count'),
        marker: {color: 'rgb(255, 83, 109)'},
        transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'year'),
        operation: '=',
        // dropdown
        value: Yearselect2
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'state'),
        // dropdown
        operation: '=',
        value: stateselect2
        },
        {
            type: 'aggregate',
            groups: unpack(rows, 'drug_name'),
            aggregations: [
            {target: 'y', func: 'avg'}
            ]
        }
        ]
        }]
      
      var layout2 = {
          // title: "Comparison 1",
          xaxis: { title: "<b>Drug Type</b>"},
          yaxis: { title: "<b>Total Deaths</b>"}
        }
      
      Plotly.newPlot('plot2', data2, layout2)
      
    });
}
changegraph2();

function changegraph3()
{
    var Yearselect3 = document.getElementById("list5").value;
    var stateselect3 = document.getElementById("list4").value;
    console.log(stateselect3);
    console.log(Yearselect3);

    Plotly.d3.json(jsontarget, function(err, rows){
        function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }

    var data3 = [{
        type: 'bar',
        x: unpack(rows, 'drug_name'),
        y: unpack(rows, 'death_count'),
        // marker: {color: 'rgb(255, 83, 109)'},
        transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'year'),
        operation: '=',
        // dropdown
        value: Yearselect3
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'state'),
        // dropdown
        operation: '=',
        value: stateselect3
        },
        {
            type: 'aggregate',
            groups: unpack(rows, 'drug_name'),
            aggregations: [
            {target: 'y', func: 'avg'},
            ]
        }
        ]
        }]
      
      var layout3 = {
          // title: "Comparison 1",
          xaxis: { title: "<b>Drug Type</b>"},
          yaxis: { title: "<b>Total Deaths</b>"}
        }
      
      Plotly.newPlot('plot3', data3, layout3)
      
    });
}
changegraph3();

function changegraph4()
{
    var drugselect = document.getElementById("graph4list1").value;
    var yearselect4 = document.getElementById("graph4list2").value;
    console.log(yearselect4);
    console.log(drugselect);

    Plotly.d3.json(jsontarget, function(err, rows){
        function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }

    var data4 = [{
        type: 'bar',
        x: unpack(rows, 'state'),
        y: unpack(rows, 'death_count'),
        marker: {color: 'rgb(55, 55, 55)'},
        transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'year'),
        operation: '=',
        // dropdown
        value: yearselect4
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'state'),
        operation: '!=',
        value: "US"
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'drug_name'),
        // dropdown
        operation: '=',
        value: drugselect
        },
        {
            type: 'aggregate',
            groups: unpack(rows, 'state'),
            aggregations: [
            {target: 'y', func: 'avg'},
            ]
        }
        ]
        }]
      

      
      var layout4 = {
          title: "<b>Deaths Per State</b>",
          xaxis: { title: "<b>State</b>"},
          yaxis: { title: "<b>Total Deaths</b>"}
        }
      
      Plotly.newPlot('plot4', data4, layout4)
      
    });
}
changegraph4();

function changegraph5()
{
    var drugselect5 = document.getElementById("graph5list1").value;
    var yearselect5 = document.getElementById("graph5list2").value;
    console.log(yearselect5);
    console.log(drugselect5);

    Plotly.d3.json(jsontarget, function(err, rows){
        function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }

    var data5 = [{
        type: "choroplethmapbox", 
        locations: unpack(rows, 'state'),
        z: unpack(rows, 'death_count'),
        geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
        transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'year'),
        operation: '=',
        // dropdown
        value: yearselect5
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'state'),
        operation: '!=',
        value: "US"
        }, 
        {
        type: 'filter',
        target: unpack(rows, 'drug_name'),
        // dropdown
        operation: '=',
        value: drugselect5
        },
        {
            type: 'aggregate',
            groups: unpack(rows, 'state'),
            aggregations: [
            {target: 'y', func: 'avg'},
            ]
        }
        ]
        }]

      var layout5 = {mapbox: {style: "dark", center: {lon: -98.53333, lat: 39.833333}, zoom: 3.25},
      width: 1000, height:600, margin: {t: 0, b: 0}};

      var config = {mapboxAccessToken: "pk.eyJ1Ijoic25pY2tldHQiLCJhIjoiY2tocGo5ZmxqMXU3ZjJ6cGVjeHJ3OXZraCJ9.dg884ZBp_wLz4cKcCqPDaA"};
      
      Plotly.newPlot('plot5', data5, layout5, config)
      
    });
}
changegraph5();