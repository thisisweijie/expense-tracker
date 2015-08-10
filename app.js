$(document).ready(function() {
	Store.init();
	App.init();
});

$

/*returns a jquery object*/
var $addExpenseBtn = $('#add-expense-btn');

//to organize the codes
var App = {

	init: function(){
		console.log('starting app...');
		App.compileTemplates();
		App.bindEvents();
		App.initPlugins();
		App.loadExpenses();
		App.refresh();
	},

	compileTemplates: function(){
		//converting into function for use in HTML
		var source   = $('#expense-list-template').html();
		//app variable use this.
		this.expenseListGenerator = Handlebars.compile(source);
	},

	loadExpenses: function(){
		//template + data = HTML string
		var html = App.expenseListGenerator(Store.expenses);
		//inject html code into the website
		$('#expense-list').html(html);
	},

	loadProgress: function(){
		var totalSpending = 0;
		for (var i = 0; i < Store.expenses.length; i++) {
			var expense = Store.expenses[i];
			totalSpending += Number(expense.price);

		}

		console.log(totalSpending);

		$('#jqmeter').jQMeter({
			goal:'300',
			raised:totalSpending+''
			// meterOrientation:'vertical',
			// width:'50px',
			// height:'200px'
		});
		// var result = false;

		// var allCategories = [];
		// for(i = 0; i < Store.expenses.length; i++){
		// 	var expense = Store.expenses[i];
		// 	for(var j = 0; j < allCategories.length; j++){
		// 		var expense2 = allCategories[j];
		// 		if(expense.category == expense2){
		// 			result = true;
		// 		}
		// 	}
		// 	console.log(result);
		// 	console.log(expense.category);

		// 	if(result == false){
		// 		allCategories.push(expense.category);
		// 	}
		// 	result = false;
		// }

		// var allExpenses = [];

		// for(i = 0; i < Store.expenses.length; i++){
		// 	var expense = Store.expenses[i];
		// 	allExpenses.push(expense.price);
		// }


		// var data = {
		// 	labels: allCategories,
		// 	datasets: [
		// 	{
		// 		label: "My First dataset",
		// 		fillColor: "rgba(220,220,220,0.2)",
		// 		strokeColor: "rgba(220,220,220,1)",
		// 		pointColor: "rgba(220,220,220,1)",
		// 		pointStrokeColor: "#fff",
		// 		pointHighlightFill: "#fff",
		// 		pointHighlightStroke: "rgba(220,220,220,1)",
		// 		data: allExpenses
		// 	}
		// 	]
		// };


	},

	loadPieChart: function() {
		var data = [{
			value: 0,
			color: "#F7464A",
			highlight: "#FF5A5E",
			label: "Food"
		}, {
			value: 0,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Transport"
		}, {
			value: 0,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Entertainment"
		// }, {
		// 	value: 0,
		// 	color: "#FDF45C",
		// 	highlight: "#FFF870",
		// 	label: "Education"
		// }
		];

		Store.expenses.forEach(function(expense) {
			if (expense.category === 'food') {
				data[0].value += Number(expense.price);
			}
			if (expense.category === 'transport') {
				data[1].value += Number(expense.price);
			}
			if (expense.category === 'entertainment') {
				data[2].value += Number(expense.price);
			}
			// if (expense.category === 'education') {
			// 	data[3].value += Number(expense.price);
			// }

		});

		this.pieChart.Doughnut(data, {
			animateScale : true,
			animationEasing: 'easeOut',
			animationSteps: 30
		});
	},


	bindEvents: function(){
		/*javascript functions are data types*/
		$addExpenseBtn.on('click', function(){
			console.log('clicked');
			$('#add-expense-modal').openModal();
		});

		/*
		Event listener
		*/
		$('.done-btn').on('click', function(){
			//retrieve the user input
			var desc = $('#add-expense-modal #desc').val();
			var price = $('#add-expense-modal #price').val();
			var category = $('#add-expense-modal #category').val();

			//create a expense object
			var expense = {
				//with "" or not still works
				"desc": desc,
				price: price,
				category: category
			}


			Store.addExpense(expense);
			App.refresh();

		})

	},

	refresh: function(){
		App.loadExpenses();
		App.loadProgress();
		App.loadPieChart();
	},

	initPlugins: function(){
		$('select').material_select();

		var ctx = $('#myChart').get(0).getContext("2d");
		this.pieChart = new Chart(ctx);
		/*
		$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15 // Creates a dropdown of 15 years to control year
	  	});
*/
}

}



var Store = {
	//key value
	expenses: [],

	//check if there is past storage
	init: function(){
		var data = localStorage.getItem('expenses');

		if(data !== null){
			//get the string back to object
			Store.expenses = JSON.parse(data);
		}
	},

	// like a method
	addExpense: function(expense){
		//save into an array in this object
		Store.expenses.push(expense);
		localStorage.setItem('expenses', JSON.stringify(Store.expenses));
	}
}

/*inject html
var html = ''
html += 'div' + title + '</div>'
*/


