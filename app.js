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

		// var ctx = document.getElementById("myChart").getContext("2d");
		// var myNewChart = new Chart(ctx).Radar(data);


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
	},

	initPlugins: function(){
		$('select').material_select();

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


