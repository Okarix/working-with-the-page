'use strict';

document.addEventListener('DOMContentLoaded', () => { // загрузка DOM дерева
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'), // получаем рекламные элементы
          poster = document.querySelector('.promo__bg'), // получаем класс promo__bg
          genre = poster.querySelector('.promo__genre'), // получаем жанр
          movieList = document.querySelector('.promo__interactive-list'), // получаем весь блок элементов(Статичная верстка с фильмами)
          addForm = document.querySelector('form.add'), // получаем форму
          addInput = addForm.querySelector('.adding__input'), // добавляем поле ввода
          checkbox = addForm.querySelector('[type="checkbox"]'); // чекбох

    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); // страничка не будет перезагружаться при нажатии кнопки

        let newFilm = addInput.value; // введено ли в поле название фильма
        const favorite = checkbox.checked; // проверка либо отмесено или нет

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавлен любимый фильм");
            }

            movieDB.movies.push(newFilm); // отправялет наш введенный фильм в массив
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);     
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {  // с помощью этого метода перебираем все рекламные элементы и соответсвенно удаляем их
            item.remove();
        });
    };
    
    const makeChanges = () => {
        genre.textContent = "ДРАМА"; // меняем название с КОМЕДИЯ на ДРАМА
    
        poster.style.backgroundImage = 'url("img/bg.jpg")'; // меняем фон
    };

    const sortArr = (arr) => { // сортировка по алфавиту
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";   // так как у нас пустая строка то все элементы удалятся
        sortArr(films);

        films.forEach((film, i) => { // динамически создаем верстку с фильмами
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film} 
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { // удаление элементов
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); 
                movieDB.movies.splice(i, 1);  

                createMovieList(films, parent); // при удалении нумерация перестраивается
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList); 

});