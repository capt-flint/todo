/**
 * API get todos
 *
 * @returns {Promise}
 */
function getTodo() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'api.php/todo', true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });

}

/**
 * API delete
 *
 * @param id
 */
function deleteTodo(id) {

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api.php/delete/' + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
            reloadTodo();
        }
    }
    xhr.send();

}

/**
 * API post
 * create todos
 */
function saveTodo() {

    var inputValue = document.getElementById('todoName').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'api.php/create', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            reloadTodo();
        }
    }

    xhr.send("name=" + inputValue);
}

/**
 * API post
 * create children - default name
 *
 * @param id
 */
function createChildren(id) {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", 'api.php/create', true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            reloadTodo();
        }

    }

    xhr.send("name=default&id=" + id);
}

/**
 * API put
 * change todos
 *
 * @param element
 * @param id
 */
function changeTodo(element, id) {

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", 'api.php/put/' + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //location.reload();
        }

    }
    xhr.send("name=" + element.value);
}
