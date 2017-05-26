/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
function rand() {
		return (Math.floor(Math.random() * 300) + 'px');
}

function color() {
	var r=Math.floor(Math.random() * (256));
	var g=Math.floor(Math.random() * (256));
	var b=Math.floor(Math.random() * (256));
	var c='#' + r.toString(16) + g.toString(16) + b.toString(16);
	return (c);
}


/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
	var el = document.createElement('div');
	el.classList.add('draggable-div');
	el.style.backgroundColor = color();
	el.style.width = rand();
	el.style.height = rand();
	el.style.position = "absolute";
	el.style.top = rand();
	el.style.left = rand();
	return (el);
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
	target.addEventListener('mousedown', function(e){
		var elem = e.target;

    	document.addEventListener('mousemove', function(e){
			elem.style.left = e.pageX + 'px';
			elem.style.top = e.pageY + 'px';
    	});
    	
    	target.addEventListener('mouseup', function(e){
			elem = null;
	    });
  	});
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
