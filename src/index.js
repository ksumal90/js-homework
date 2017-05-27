/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
	var promise = new Promise (function(resolve, reject){
		setTimeout(function(){
			 resolve();
		}, seconds * 1000);
	});

	return promise;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
	var promise = new Promise(function(resolve, request){
		function sortArr(a,b){
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
		}

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);//готовит объект, 
		xhr.send();
		
		xhr.addEventListener('load', function(){
			if (status > 400){
				request();
				return false;
			}
			var arr = JSON.parse(xhr.response);
			arr.sort(sortArr);
			resolve(arr);
		});
	})

	return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
