!function e(t,o,n){function i(d,s){if(!o[d]){if(!t[d]){var r="function"==typeof require&&require;if(!s&&r)return r(d,!0);if(a)return a(d,!0);var l=new Error("Cannot find module '"+d+"'");throw l.code="MODULE_NOT_FOUND",l}var u=o[d]={exports:{}};t[d][0].call(u.exports,function(e){var o=t[d][1][e];return i(o?o:e)},u,u.exports,e,t,o,n)}return o[d].exports}for(var a="function"==typeof require&&require,d=0;d<n.length;d++)i(n[d]);return i}({1:[function(e,t,o){function n(){this.todoListDIV=document.getElementById("todo-list"),this.newTodoBTN=document.getElementsByClassName("js-new-todo")[0],this.loadCompletedTodoBTN=document.getElementsByClassName("js-load-completed-todo")[0],this.todoPanel=null,this.todoData=null,this.todoList=[],this.todoLoaded=!1,this.completedTodoLoaded=!1,this.animationDelay=150}var i=e("./_todo-panel.js"),a=e("./_todo.js");n.prototype.init=function(){var e=this;e.request(),e.todoPanel=new i(e),e.todoPanel.init(),e.events()},n.prototype.request=function(){var e=this,t=0==e.completedTodoLoaded?"upcoming":"completed",o=new XMLHttpRequest;o.open("GET","?action="+t,!0),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.todoData=t,e.addTodo()}else console.log("server hit, request bad")},o.onerror=function(){console.log("connection error")},o.send(),e.completedTodoLoaded=!e.completedTodoLoaded},n.prototype.events=function(){var e=this;e.newTodoBTN.addEventListener("click",function(t){e.todoPanel.isActive===!1?e.todoPanel.open():e.todoPanel.close()}),e.loadCompletedTodoBTN.addEventListener("click",function(t){e.clearTodo(),e.completedTodoLoaded===!1?e.loadCompletedTodoBTN.innerHTML="Completed ToDos":e.loadCompletedTodoBTN.innerHTML="Upcoming ToDos"})},n.prototype.addTodo=function(){var e=this;e.todoData.reverse(),e.todoData.forEach(function(t){var o=new a(t,e);e.todoList.push(o),o.init(),e.todoListDIV.insertBefore(o.div,e.todoListDIV.firstChild),o["in"](e.animationDelay),e.animationDelay+=50}),e.todoLoaded=!0,e.animationDelay=50},n.prototype.clearTodo=function(){var e=this;e.todoList.reverse();for(var t=e.todoList.length-1;t>=0;t-=1){var o=e.todoList[t];o.out(e.animationDelay),e.animationDelay+=50}e.animationDelay=50},n.prototype.removeTodo=function(e,t){var o=this,t=t||o.animationDelay,n=o.todoList.filter(function(t){return t.id==e})[0],e=o.todoList.indexOf(n);setTimeout(function(){n.div.parentNode.removeChild(n.div),o.todoList.splice(e,1),0===o.todoList.length&&o.request()},t)},t.exports=n},{"./_todo-panel.js":2,"./_todo.js":3}],2:[function(e,t,o){function n(e){this.parent=e,this.section=document.getElementsByClassName("todo-panel")[0],this.form=document.getElementById("todo-panel-form"),this.titleInput=document.getElementById("todo-title"),this.dueMonthInput=document.getElementById("todo-due-month"),this.dueDayInput=document.getElementById("todo-due-day"),this.dueYearInput=document.getElementById("todo-due-year"),this.addBTN=document.getElementsByClassName("js-submit")[0],this.cancelBTN=document.getElementsByClassName("js-cancel")[0],this.errorMessage=this.section.querySelectorAll(".message")[0],this.isActive=!1}n.prototype.init=function(){var e=this;e.addBTN.addEventListener("click",function(t){t.preventDefault(),e.newTodo()}),e.cancelBTN.addEventListener("click",function(t){t.preventDefault(),e.close()}),e.titleInput.addEventListener("blur",function(t){e.titleInput.classList.remove("error"),e.errorMessage.classList.remove("active")})},n.prototype.open=function(){var e=this;e.setTodaysDate(),e.section.classList.add("active"),e.isActive=!0},n.prototype.close=function(){var e=this;e.section.classList.remove("active"),e.isActive=!1,e.form.reset(),e.setTodaysDate()},n.prototype.newTodo=function(){var e=this,t=encodeURIComponent(e.titleInput.value),o=String(e.dueYearInput.value+"-"+e.dueMonthInput.value+"-"+e.dueDayInput.value);if(e.validateInput(t)===!0){var n=new XMLHttpRequest;n.open("GET","?action=create&title="+t+"&due_date="+o,!0),n.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);if(console.log(e.parent.todoData),e.parent.todoData.length>0){var o=new Todo(t,e.parent);e.parent.todoData.push(t),e.parent.todoList.push(o),o.init(),e.parent.todoListDIV.insertBefore(o.div,e.parent.todoListDIV.firstChild),o["in"](e.parent.animationDelay),console.log("hey")}}else console.log("server hit, request bad")},n.onerror=function(){console.log("connection error")},n.send(),e.close()}},n.prototype.editTodo=function(e){var t=this;t.titleInput.value=e.title;String(t.dueYearInput.value+"-"+t.dueMonthInput.value+"-"+t.dueDayInput.value);t.open(),console.log("made it"),t.validateInput(title)===!0&&t.close()},n.prototype.setTodaysDate=function(){var e=this,t=new Date,o=t.getMonth()+1,n=t.getDate(),i=t.getFullYear();10>o&&(o="0"+o),e.dueDayInput.value=10>n?"0"+n:n,e.dueMonthInput.value=o,e.dueYearInput.value=i,e.titleInput.classList.remove("error"),e.errorMessage.classList.remove("active")},n.prototype.validateInput=function(e){var t=this;return""===t.titleInput.value?(t.titleInput.classList.add("error"),t.errorMessage.classList.add("active"),!1):!0},t.exports=n},{}],3:[function(e,t,o){function n(e,t){this.parent=t,this.id=e.id,this.title=e.title,this.dueDate=e.due_date,this.overdue=e.overdue,this.complete=e.complete,this.div=null,this.deleteBTN=null,this.editBTN=null,this.primaryBTN=null}n.prototype.init=function(){var e=this;e.complete===!1&&e.isOverdue(),e.template(),e.events()},n.prototype.events=function(){var e=this;e.primaryBTN.addEventListener("click",function(t){e.complete===!1?e.done():e.reset()}),null!==e.deleteBTN&&e.deleteBTN.addEventListener("click",function(t){e["delete"]()}),null!==e.editBTN&&e.editBTN.addEventListener("click",function(t){e.edit()})},n.prototype["delete"]=function(){var e=this;e.update("delete"),e.out(300)},n.prototype.edit=function(){var e=this;e.parent.todoPanel.editTodo(e)},n.prototype.done=function(){var e=this;e.update("done"),e.out(300)},n.prototype.reset=function(){var e=this;e.update("reset"),e.out(300)},n.prototype.isOverdue=function(){var e=this,t=new Date,o=new Date(e.dueDate);t.getTime()>=o.getTime()&&e.update("overdue")},n.prototype.update=function(e){var t=this,o=new XMLHttpRequest;o.open("GET","?action="+e+"&id="+t.id,!0),o.onload=function(){if(this.status>=200&&this.status<400){JSON.parse(this.response)}else console.log("server hit, request bad")},o.onerror=function(){console.log("connection error")},o.send()},n.prototype["in"]=function(e){var t=this;setTimeout(function(){requestAnimationFrame(function(){t.div.classList.remove("js-todo-in")})},e)},n.prototype.out=function(e){var t=this;setTimeout(function(){requestAnimationFrame(function(){t.div.classList.add("js-todo-out"),t.parent.removeTodo(t.id,e)})},e)},n.prototype.template=function(){var e=this,t=["blue","green","pink","purple"],o=t[Math.floor(Math.random()*t.length)];e.div=document.createElement("div"),e.div.className=e.complete===!1?"todo js-todo-in "+o:"todo complete js-todo-in "+o,e.div.id=e.id,e.div.tabIndex=0;var n=document.createElement("div");n.className=e.overdue===!0&&e.complete===!1?"message message--urgent active":"message message--urgent";var i=document.createElement("p");i.innerHTML="This ToDo is OverDo!";var a=document.createElement("div");a.className="todo-info";var d=document.createElement("div");d.className="todo-button-group button-group";var s=document.createElement("div");s.className="todo-primary-action";var r=document.createElement("h2");r.innerHTML='Due: <span class="text">'+e.dueDate+"</span>",r.setAttribute("class","todo-info__title");var l=document.createElement("h3");l.innerHTML=e.title,l.setAttribute("class","todo-info__title"),e.complete===!1?(e.primaryBTN=document.createElement("button"),e.primaryBTN.innerHTML="Done",e.primaryBTN.className="button button--primary button--large js-todo-complete",e.editBTN=document.createElement("button"),e.editBTN.innerHTML="Edit",e.editBTN.className="button button--secondary js-todo-edit",e.deleteBTN=document.createElement("button"),e.deleteBTN.innerHTML="Delete",e.deleteBTN.className="button button--secondary js-todo-delete",d.appendChild(e.editBTN),d.appendChild(e.deleteBTN),s.appendChild(e.primaryBTN)):(e.primaryBTN=document.createElement("button"),e.primaryBTN.innerHTML="Undo",e.primaryBTN.className="button button--primary button--large js-todo-undo ",s.appendChild(e.primaryBTN)),n.appendChild(i),a.appendChild(r),a.appendChild(l),a.appendChild(d),e.div.appendChild(n),e.div.appendChild(a),e.div.appendChild(s)},t.exports=n},{}],4:[function(e,t,o){var n=e("./_app.js"),i=!1;document.onreadystatechange=function(){if(!i&&("interactive"===document.readyState||"complete"===document.readyState)){i=!0;var e=new n;e.init()}}},{"./_app.js":1}]},{},[4]);