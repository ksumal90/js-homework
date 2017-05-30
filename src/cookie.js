/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function(e) {
	var valueInput = e.target.value;
	console.log(valueInput);
	var obj = getCookie();
	if (valueInput == ''){
		console.log('пусто');
	} else {
		for (var key in obj){	
			if ((isMatching(key, valueInput)) || (isMatching(obj[key], valueInput))){
				document.cookie = addNameInput.value + '=' + addValueInput.value;//создаем cookie имя = значение
				var cookieArray = getCookie();
				listTable.innerHTML="";
				createElements(cookieArray);
				console.log('есть совпадения');
			
			}
			else {
				listTable.innerHTML="";
				console.log('нет');
				
			}
		}
	}
	
});


function isMatching(full, chunk) {
	if (full.indexOf(chunk) != -1) {
		return true;
	} 
	return false;
}

function getCookie(){//получение все cookie
	if (!document.cookie){
		return;
	}

	return document.cookie.split('; ').reduce(function(prev, current){
		var [key, value] = current.split('=');
		prev[key] = value;
		return prev;
		
	},{});
}


function createElements(cookieArray){//создаем таблицу
		for (var key in cookieArray){	
		var trElement = document.createElement('tr');
		var tdElement1 = document.createElement('td');
		var tdElement2 = document.createElement('td');
		var tdElement3 = document.createElement('td');
		var removeButton = document.createElement('button');
		removeButton.className = 'buttonRemove';
		listTable.appendChild(trElement);
		trElement.appendChild(tdElement1);
		trElement.appendChild(tdElement2);
		trElement.appendChild(tdElement3);
		removeButton.textContent = "Удалить";
		tdElement1.textContent = key;
		tdElement2.textContent = cookieArray[key];
		tdElement3.appendChild(removeButton);
	}
}


addButton.addEventListener('click', () => {

	document.cookie = addNameInput.value + '=' + addValueInput.value;//создаем cookie имя = значение
	var filter = filterNameInput.value;//значение фильтра
	var cookieArray = getCookie();

	listTable.innerHTML="";
	createElements(cookieArray);
});



listTable.addEventListener('click', function(e){
	var classElement = e.target.className;
	if (classElement == 'buttonRemove'){
		var parent = e.target.parentElement.parentElement;
		console.log(parent.children[0].textContent);
		var data = new Date;
		data.setSeconds(data.getSeconds() - 1);
		document.cookie = parent.children[0].textContent + '=' + parent.children[1].textContent+'; expires='+ data.toUTCString();
		parent.remove();
	}
});