
//7 de octubre
/*
class Nodo {
  constructor(value){
    this.value = value,
    this.next = null 
  }
}

class LinkedList {
constructor(){
  this.head = null
}
  insert(value){
  const newNodo = new Nodo(value)
  if(this.head === null){
    this.head = newNodo;
  }else{
  let current = this.head;
  while(current.next){//hasta que no existe un current.next
    current = current.next
  };
  
   current.next =  newNodo
  
}
  }
  getNodo(){
    return this.head
  }

  delete(value){
    if(!this.head) return;

    if(value === this.head.value) {
     this.head = this.head.next
     return;
    }else{
      let current = this.head
      while(current.next && current.next.value !== value){
           current = current.next
      }
      if(current.next){
          current.next = current.next.next
      };
    }
  }
  search(value){
    if(!this.head) return false;

    if(this.head.value === value){
        return true;
    }else{
      let current = this.head
    while(current.next && current.next.value !== value){
      //if(current.value)
      current =current.next
    }
    if(current.next){
      return true
    }else{
        return false
    }
}
  }

  printList() {
    let current = this.head;
    while (current !== null) {
            console.log(current.value);
            current = current.next;//null
    
    }}

}
//encontrar medio de lista enlazada
function findmiddle(head){
  let slow=head, fast=head;
  console.log("fast",fast)
  while(fast && fast.next){
    slow = slow.next;
    fast = fast.next.next
    console.log('slow')
  }
  return slow
}
//eliminar duplicado nodo

function removeDuplicates(head) {
    let current = head;
    const values  = new Set();
    let prev = null;
    while (current) {//rrecorre
        if (values.has(current.value)) {
            prev.next = current.next;//??[value:3,next:3]-[value:3,next:null] = [3,next:null]
            //agarra lo que sobra
        } else {
            values.add(current.value);//1,3
            prev = current;
            console.log('prev',prev)
        }
        current = current.next;
        console.log(current,'===')
    }
}


//detectar ciclos
function hasCycle(head) {
    let slow = head, fast = head;
    console.log(slow,"before the while")
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        console.log(slow,'===',fast)
        if (slow === fast) return true;
    }
    return false;
}
// 2 - 4 - 5 - 7 - 6 - 4 - 6




 //reversa de una lista enlazada
 function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    while (current) { //4-5

        let next = current.next;  //next = 5 , next = null   nullv current--[prev (4)]-->[null(5next)]-->[]

        current.next = prev;  //4 -->5=null , null = 4 (5-->4)

        prev = current;// null= 4 -->null , 4=5(5-->4)

        current = next;// 4= 5 -->null, 5=null
    }
    console.log(prev,'6')
    return prev;
}

//4 5 6, 546,654

let head = new Nodo(3)
let one = new Nodo(4)
let three = new Nodo(1)
let four = new Nodo(8)
let five = new Nodo(10)

head.next = one
one.next = three
three.next = four
four.next = five

console.log('-------')

console.log(reverseLinkedList(head))

*/


   
    //stack-pilas  8/10/2024

    //Verifica si una secuencia de paréntesis es válida utilizando una pila.
const products = [{name:"televisor",modelo:"asdad"},{name:"televisor",modelo:"asdad"},
    {name:"celular",modelo:"asdad"},{name:"celular",modelo:"asdad"},{name:"camara",modelo:"asdad"}]

    function searchingData(sataSearch,prodList){
        
        if(!prodList){
            throw new Error('there is an error')
        };
        const regex = new RegExp(sataSearch);
        return prodList.filter(value => regex.test(value.name))

    }



console.log(searchingData('c',products))
    /*
----------------------------
//13/10/2024
5. Trees (Árboles)
Ejercicios:

Implementa un árbol binario con operaciones para agregar, eliminar y buscar un nodo.
Realiza un recorrido en preorden, inorden y postorden en un árbol binario.
Encuentra la altura de un árbol binario.
Verifica si un árbol es un árbol binario de búsqueda (BST).
Encuentra el valor mínimo y máximo en un árbol binario de búsqueda.
Soluciones:

Árbol binario básico

javascript
Copiar código
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {//busca el nodo en el que se encuentra ese valor
        if (!node) return null;
        if (value < node.value) return this.searchNode(node.left, value);
        else if (value > node.value) return this.searchNode(node.right, value);
        else return node;
    }
}
Recorridos de árbol (preorden, inorden, postorden)

javascript
Copiar código
function preOrder(node) {
    if (node !== null) {
        console.log(node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}

function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
    }
}

function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.value);
    }
}
Altura de un árbol

javascript
Copiar código
function findHeight(node) {
    if (node === null) return -1;
    let leftHeight = findHeight(node.left);
    let rightHeight = findHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
}
Verificar si es un BST

javascript
Copiar código
function isBST(node, min = null, max = null) {
    if (node === null) return true;
    if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) return false;
    return isBST(node.left, min, node.value) && isBST(node.right, node.value, max);
}
Valor mínimo y máximo en un BST

javascript
Copiar código
function findMin(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node.value;
}

function findMax(node) {
    while (node.right !== null) {
        node = node.right;
    }
    return node.value;
}
*/