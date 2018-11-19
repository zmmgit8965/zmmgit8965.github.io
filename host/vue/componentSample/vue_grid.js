// Define a new component called button-counter
Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
Vue.component('vue-grid', {
    props:["gridData"],
    template: `
        <table class='grid-table'>                                                 
            <tr>                                                                 
                <td v-for='colName in gridData.colNames'>{{colName}}</td>         
            </tr>                                                                   
            <tr v-for='r in gridData'>                                              
                <td v-for='colName in gridData.colNames'>{{ r[colName] }}</td>       
            </tr>                                                                   
        </table>` ,
    created:function(){
        if(this.gridData.length > 0){
            var row = this.gridData[0];
            var colNames = [];
            for(var colName in row){
                colNames.push(colName);
            }
            this.gridData.colNames = colNames;
        }
        console.log(this.gridData.colNames);
    }
})