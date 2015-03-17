	  //Функція, що завантажується сама має такий синтаксис (function(){//тіло функції}());
 (function () {
	  //app - модель даних, в нашому випадку- повноцінний клас
	var app = {
		// оскільки для представлення п’ятнашок в зрозумілому для машини вигляді ми використовуватимемо одновимірний масив, 
		//рухи прописати буде дуже легко.
		Actions: {
			up: -4,
			left: -1,
			down: 4,
			right: 1
		},
		//тут ми описуємо массив, який і буде представленням ігрової моделі для машини. Оскільки масиви теж є об’єктами, можемо
		//викликати в ньому метод sort, який його перемішає по випадковому ключу з функції Math.random()-.5; })
		//метод concat() для прототипу масиву склеїть массиви, які ми отримали на виході sort() і масив з одного елементу (0), 
		//який опиниться в його кінці. data.push(0) виконує аналогічну операцію. 
		data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() {
			return Math.random() - .5;
		}).concat(0),
		//позиція в массиві нуль-елемента
		hole: 15,
		//go  метод об’єкту app (тобто функція, що приймає напрям руху)
		go: function(move) {
			var index = this.hole + move;
			if (!this.data[index]) return false; //перевірка на те, чи ми не виходимо за межі масиву
			if (move == app.Actions.left || move == app.Actions.right) //Якщо рух здійснюється вліво чи вправо, перевіряємо,
			//чи ми не вийшли за межі ряду
				if (Math.floor(this.hole / 4) !== Math.floor(index / 4)) return false; //якщо діра і поточний елемент не в одному ряді
				//при гор. русі, рух не здійснюється
			this.change(index, this.hole);		//переставляємо елементи
			this.hole = index;					//переміщаємо діру
			return true;						
		},
		change: function(i1, i2) {				//функція перестановки (тут очевидно)
			var t = this.data[i1];
			this.data[i1] = this.data[i2];
			this.data[i2] = t;
		}
	};
	$('body').append("<div class='box'></div>");		//додаю в вміст тега body <div class='box'></div> 
	var box = $('.box');
	for (var i = 0; i < 16; i++) {
		box.append('<div></div>')						//додаю в вміст тега div з класом box <div></div>
	};
	window.addEventListener('keydown', function(e) {	//слухаю натискання клавіші, у кожної свій код, у стрілки вліво 39 і далі по аналогії
	  if (app.go(app.Actions[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {	// передаю в метод go напрям руху, якщо хід можливий, перемельовую поле
	    draw();}});
	draw();
	function draw() {		//малюю поле, в кожну клітинку вставляю відповідне значення за допомогою .text() з jQuery
	  for (var i = 0, tile; tile = $(box.children()[i]), i < 16; i++) {
	    tile.text(app.data[i]);
	    tile.css('visibility',(app.data[i]? 'visible' : 'hidden'));  //даю кожному боксу відповідне css правило видимий/невидимий } };
	   	//visibility - правило css, (app.data[i]? 'visible' : 'hidden') - його значення. Це тернарний оператор - якщо існує app.data[i] повертає visible
	   	//інакше hidden
	   }
	}    
}());	    