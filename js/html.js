/**
 * init app
 * get Todos
 */

function initApp() {

    getTodo()
        .then(function (result) {
            var result = JSON.parse(result);
            var tree = makeTree(result);
            addTodo(tree);
         })
        .catch(function (err) {
            console.error('error ', err.statusText);
        });
}

/**
 * Add todos for page
 * @param result
 * @param dep
 */
function addTodo(result, dep = 0) {
    result.forEach(function (element) {
        addLiHtml(element, dep);

        if (element.children.length) {
            var resultArray = [];
            var margin = 0;
            margin = 15 * element.children[0].dep;
            for (var prop in element.children) {
                resultArray.push(element.children[prop]);
            }
            addTodo(resultArray, margin);
        }

    });
}


/**
 * wrapper for li
 * @param element
 * @param margin
 */
function addLiHtml(element, margin) {

    var el = document.createElement('div');
    el.style.marginLeft = margin + 'px';
    el.classList.add("input-group");
    el.innerHTML = '<input class="form-control" type="text" onchange="changeTodo(this , ' + element.id + ')" value="' + element.name + '">'
    + '<span class="input-group-btn"><button class="btn btn-primary" onclick="createChildren(' + element.id + ')"><span class="glyphicon glyphicon-plus"></span></button>'
    + '</span><span class="input-group-btn"><button class="btn btn-danger" onclick="deleteTodo(' + element.id + ')"><span class="glyphicon glyphicon glyphicon-trash"></span></button></span>';
    document.getElementById('parentList').appendChild(el);
}

// <div class="input-group">
//   <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
//   <span class="input-group-addon" id="basic-addon2">@example.com</span>
      // <span class="input-group-btn">
      //   <button class="btn btn-secondary" type="button">Go!</button>
      // </span>
// </div>

/*
 delete all li
 reload todos
 add li in html
 */
function reloadTodo() {
    var parent = document.getElementById("parentList");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    initApp()
}