"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _localStorage = require("./local-storage.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function toDoListApp() {
  var create = document.querySelector(".create");
  var input = document.querySelector(".input input");
  var btnTampilkanListContainer = document.querySelector(".tambah-filter .list-create-btn");
  var listContainer = document.querySelector(".list-container");
  var listColor = document.querySelectorAll(".color span");
  var colorName = "#ffffff";
  var semuaList = [];
  var listEdit = true;
  var creating = false; // Get Data

  var List = function List(isiList, warna) {
    var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "uncompleted";
    this.isiList = isiList;
    this.warna = warna;
    this.status = status;
  };

  document.querySelector(".date p").textContent = new Date().toDateString();

  var addImgWhenListNothing = function addImgWhenListNothing() {
    if (semuaList.length == 0) {
      listContainer.classList.add("nothing-list");
      listContainer.innerHTML = "<img src=\"../App/img/undraw_complete_task.svg\" alt=\"nothing-list\" />";
    } else {
      listContainer.classList.remove("nothing-list");
    }
  };

  addImgWhenListNothing();
  /*
  ======================================================================================================
  ==========  STATEMENT - STATEMENT YANG BERHUBUNGAN KETIKA TOMBOL BUAT LIST DIKLIK  =================== 
  ======================================================================================================
  */

  btnTampilkanListContainer.addEventListener("click", function () {
    return tampilkanListContainer();
  });

  var tampilkanListContainer = function tampilkanListContainer() {
    setTimeout(function () {
      return creating = true;
    }, 300);
    if (creating) return;else {
      btnTampilkanListContainer.classList.add("active");
      setTimeout(function () {
        btnTampilkanListContainer.children[0].classList.add("active");
        btnTampilkanListContainer.children[1].classList.add("active");
        setTimeout(function () {
          return input.focus();
        }, 100);
      }, 300);
      btnTampilkanListContainer.children[2].classList.add("active");
    }
  }; // Enter Trigger


  input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      createList();
    }
  }); // Create List

  document.querySelector(".buat-list").addEventListener("click", function (e) {
    e.stopPropagation();
    createList();
  }); // Close List

  document.querySelector(".close-icon").addEventListener("click", function (e) {
    e.stopPropagation();
    closeList();
  });

  var btnList = function btnList(e) {
    return "\n\t\t<div class=\"list ".concat(e.warna, " ").concat(e.status, "\" style=\"background-color: ").concat(e.warna, "\">\n\t\t\t<p>").concat(e.isiList, "</p>\n\t\t\t<input>\n\t\t\t<span>\n\t\t\t\t<i class=\"lnr lnr-pencil edit\"></i>\n\t\t\t\t<i class=\"lnr lnr-trash hapus\"></i>\n\t\t\t</span>\n\t\t</div>");
  };

  var tampilkanSemuaList = function tampilkanSemuaList(arr) {
    listContainer.textContent = "";
    listContainer.classList.remove("nothing-list");
    arr.map(function (e) {
      var button = btnList(e);
      listContainer.insertAdjacentHTML("beforeend", button);
    });
  };

  var createList = function createList() {
    if (input.value === "") return;else {
      semuaList.push(new List(input.value, colorName));
      tampilkanSemuaList(semuaList);
      (0, _localStorage.syncWithLocalStorage)("ADD", input.value, colorName);
    }
    closeList();
  };

  var closeList = function closeList() {
    input.value = "";
    create.classList.remove("active");
    btnTampilkanListContainer.classList.remove("active");
    btnTampilkanListContainer.children[0].classList.remove("active");
    btnTampilkanListContainer.children[1].classList.remove("active");
    btnTampilkanListContainer.children[2].classList.remove("active");
    creating = false;
  };

  var changeListColor = function changeListColor(color) {
    var changeColor = function changeColor(colorHex) {
      input.style.backgroundColor = colorHex;
      colorName = colorHex;
      input.focus();
    };

    var colorId = color.id;

    switch (colorId) {
      case "yellow":
        changeColor("#f0ffb4");
        break;

      case "green":
        changeColor("#b0ffc8");
        break;

      case "blue":
        changeColor("#b8e1ff");
        break;

      case "red":
        changeColor("#ffc6c6");
        break;

      case "black":
        changeColor("#b6b6b6");
        break;

      case "white":
        changeColor("#ffffff");
        break;
    }

    for (var i = 0; i < listColor.length; i++) {
      listColor[i].classList.remove("active");
    }

    color.classList.add("active");
  };

  listColor.forEach(function (color) {
    return color.addEventListener("click", function () {
      changeListColor(color);
    });
  });
  /*
  ======================================================================================================
  =============                                  AKHIR                             ===================== 
  ======================================================================================================
  */

  /*
  ======================================================================================================
  ==========    STATEMENT - STATEMENT YANG BERHUBUNGAN KETIKA TOMBOL LIST DI KLIK    =================== 
  ======================================================================================================
  */
  //? Document Listener

  document.addEventListener("click", function (e) {
    var target = e.target;

    if (target.classList.contains("list")) {
      var isiListDOM = target.children[0].textContent.trim();
      var list = semuaList.find(function (list) {
        return list.isiList == isiListDOM;
      });
      var isiList = list.isiList,
          warna = list.warna;
      var statusUpdate; // Ketika list di klik pada saat belum selesai

      if (target.classList.contains("uncompleted")) {
        target.classList.add("completed");
        target.classList.remove("uncompleted");
        statusUpdate = "completed";
        listEdit = false; // Ketika list di klik pada saat sudah selesai
      } else {
        target.classList.remove("completed");
        target.classList.add("uncompleted");
        statusUpdate = "uncompleted";
        listEdit = true;
      }

      semuaList.find(function (list) {
        if (list.isiList == isiListDOM) list.status = statusUpdate;
      });
      (0, _localStorage.syncWithLocalStorage)("UPDATE", isiList, warna, statusUpdate);
    }
  });
  /*
  ======================================================================================================
  =============                                  AKHIR                             ===================== 
  ======================================================================================================
  */

  /*
  ======================================================================================================
  ==========      STATEMENT - STATEMENT YANG BERHUBUNGAN DENGAN FITUR PADA LIST      ===================
  ======================================================================================================
  */

  var removeList = function removeList(target) {
    // Hapus List pada DOM
    var listDOM = target.parentElement.parentElement; // Ambil .list
    // Animasi saat dihapus

    listDOM.classList.add("remove");
    listDOM.addEventListener("transitionend", function () {
      return listDOM.remove();
    }); // Hapus List pada array semuaList

    var isiListDOM = listDOM.children[0].textContent.trim();
    var listUpdate = [];
    semuaList.filter(function (list) {
      return list.isiList != isiListDOM ? listUpdate.push(list) : listUpdate = listUpdate;
    });
    semuaList = listUpdate; // Reasiggn Ulang semuaList

    addImgWhenListNothing(); // Hapus List pada Local Storage

    (0, _localStorage.syncWithLocalStorage)("DELETE", isiListDOM);
  };

  var editList = function editList(target) {
    var inputActivation = function inputActivation(target) {
      var isiList = target.parentElement.parentElement.children[0].textContent.trim();
      var inputInList = target.parentElement.parentElement.children[1];
      inputInList.classList.add("active");
      inputInList.focus();
      inputInList.value = isiList;
      target.parentElement.parentElement.children[0].textContent = ""; // Enter trigger

      inputInList.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
          sinkronListPadaSemuaList(isiList, inputInList.value);
          inputInList.classList.remove("active");
        }
      });
    };

    inputActivation(target); // Sinkron dengan semuaList

    var sinkronListPadaSemuaList = function sinkronListPadaSemuaList(isiListSebelum, isiListSesudah) {
      var list = semuaList.filter(function (list) {
        if (list.isiList == isiListSebelum) {
          list.isiList = isiListSesudah;
          target.parentElement.parentElement.children[0].textContent = isiListSesudah;
          return list;
        }
      });
      var _list$ = list[0],
          isiList = _list$.isiList,
          warna = _list$.warna,
          status = _list$.status;
      (0, _localStorage.syncWithLocalStorage)("DELETE", isiListSebelum);
      (0, _localStorage.syncWithLocalStorage)("UPDATE", isiList, warna, status);
    };
  };

  listContainer.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("hapus")) removeList(target);

    if (target.classList.contains("edit")) {
      if (listEdit == true) editList(target);else if (listEdit == false) return;
    }
  });
  /*
  ======================================================================================================
  =============                                  AKHIR                             ===================== 
  ======================================================================================================
  */

  /*
  ======================================================================================================
  ==========          STATEMENT - STATEMENT YANG BERHUBUNGAN DENGAN OPTION           ===================
  ======================================================================================================
  */

  var aktifasiOption = function aktifasiOption() {
    var optSelected = document.querySelectorAll(".opt-selected");
    var optGroup = document.querySelectorAll(".opt-group");
    var optSelect = document.querySelectorAll(".opt-select");

    var hideOpt = function hideOpt() {
      return optGroup.forEach(function (e) {
        return e.classList.remove("active");
      });
    };

    optSelected.forEach(function (e) {
      e.addEventListener("click", function () {
        hideOpt();
        this.nextElementSibling.classList.toggle("active");
      });
    });
    optSelect.forEach(function (e) {
      return e.addEventListener("click", function () {
        this.parentElement.previousElementSibling.textContent = e.textContent;
        hideOpt();
      });
    });
  };

  aktifasiOption();

  var urutkanList = function urutkanList() {
    var status = "Semua";
    var kategori1 = document.querySelectorAll("#kategori1");
    var kategori2 = document.querySelectorAll("#kategori2");
    kategori1.forEach(function (e) {
      return e.addEventListener("click", function (event) {
        return fillterCompletedUncompleted(event.target);
      });
    });
    kategori2.forEach(function (e) {
      return e.addEventListener("click", function (event) {
        return fillterByColor(event.target);
      });
    });

    function fillterCompletedUncompleted(target) {
      switch (target.textContent) {
        case "Semua":
          tampilkanSemuaList(semuaList);
          status = "Semua";
          break;

        case "Selesai":
          var listSelesai = semuaList.filter(function (list) {
            return list.status == "completed";
          });
          tampilkanSemuaList(listSelesai);
          status = "Selesai";
          break;

        case "Belum Selesai":
          var listBelumSelesai = semuaList.filter(function (list) {
            return list.status == "uncompleted";
          });
          tampilkanSemuaList(listBelumSelesai);
          status = "Belum Selesai";
          break;
      }
    }

    function fillterByColor(target) {
      if (status == "Semua" && target.textContent == "Semua Warna") tampilkanSemuaList(semuaList);else if (status == "Semua") {
        var semuaListFilter;

        var filterList = function filterList(warnaList) {
          return semuaList.filter(function (list) {
            return list.warna == warnaList;
          });
        };

        if (target.textContent == "Semua Warna") return;
        if (target.textContent == "Kuning") semuaListFilter = filterList("#f0ffb4");
        if (target.textContent == "Hijau") semuaListFilter = filterList("#b0ffc8");
        if (target.textContent == "Biru") semuaListFilter = filterList("#b8e1ff");
        if (target.textContent == "Merah") semuaListFilter = filterList("#ffc6c6");
        if (target.textContent == "Hitam") semuaListFilter = filterList("#b6b6b6");
        if (target.textContent == "Putih") semuaListFilter = filterList("#ffffff");
        tampilkanSemuaList(semuaListFilter);
      } else if (status == "Selesai") {
        var _semuaListFilter;

        var _filterList = function _filterList(statusList, warnaList) {
          return semuaList.filter(function (list) {
            return list.status == statusList && list.warna == warnaList;
          });
        };

        if (target.textContent == "Semua Warna") _semuaListFilter = semuaList.filter(function (list) {
          return list.status == "completed";
        });
        if (target.textContent == "Kuning") _semuaListFilter = _filterList("completed", "#f0ffb4");
        if (target.textContent == "Hijau") _semuaListFilter = _filterList("completed", "#b0ffc8");
        if (target.textContent == "Biru") _semuaListFilter = _filterList("completed", "#b8e1ff");
        if (target.textContent == "Merah") _semuaListFilter = _filterList("completed", "#ffc6c6");
        if (target.textContent == "Hitam") _semuaListFilter = _filterList("completed", "#b6b6b6");
        if (target.textContent == "Putih") _semuaListFilter = _filterList("completed", "#ffffff");
        tampilkanSemuaList(_semuaListFilter);
      } else if (status == "Belum Selesai") {
        var _semuaListFilter2;

        var _filterList2 = function _filterList2(statusList, warnaList) {
          return semuaList.filter(function (list) {
            return list.status == statusList && list.warna == warnaList;
          });
        };

        if (target.textContent == "Semua Warna") _semuaListFilter2 = semuaList.filter(function (list) {
          return list.status == "uncompleted";
        });
        if (target.textContent == "Kuning") _semuaListFilter2 = _filterList2("uncompleted", "#f0ffb4");
        if (target.textContent == "Hijau") _semuaListFilter2 = _filterList2("uncompleted", "#b0ffc8");
        if (target.textContent == "Biru") _semuaListFilter2 = _filterList2("uncompleted", "#b8e1ff");
        if (target.textContent == "Merah") _semuaListFilter2 = _filterList2("uncompleted", "#ffc6c6");
        if (target.textContent == "Hitam") _semuaListFilter2 = _filterList2("uncompleted", "#b6b6b6");
        if (target.textContent == "Putih") _semuaListFilter2 = _filterList2("uncompleted", "#ffffff");
        tampilkanSemuaList(_semuaListFilter2);
      }
    }
  };

  urutkanList();
  /*
  ======================================================================================================
  =============                                  AKHIR                             ===================== 
  ======================================================================================================
  */

  /*
  ======================================================================================================
  =============    STATEMENT - STATEMENT YANG BERHUBUNGAN DENGAN LOCAL STORAGAE    =====================
  ======================================================================================================
  */
  //? Get Todo and Create

  var todoFromLocal = localStorage.getItem(_localStorage.STORAGE_TODO);

  if (todoFromLocal) {
    var todos = JSON.parse(todoFromLocal);

    for (var key in todos) {
      var _todos$key = _slicedToArray(todos[key], 3),
          isiList = _todos$key[0],
          warna = _todos$key[1],
          status = _todos$key[2]; // Destructuring value


      semuaList.push(new List(isiList, warna, status)); // Isi kembali array semuaList

      tampilkanSemuaList(semuaList);
      (0, _localStorage.syncWithLocalStorage)("ADD", isiList, warna, status);
    }
  }
  /*
  ======================================================================================================
  =============                                  AKHIR                             ===================== 
  ======================================================================================================
  */

}

var _default = toDoListApp;
exports["default"] = _default;