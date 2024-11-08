/*class NodoList{
    constructor(value){
        this.value=value;
        this.next=null;
    }
}



function findmiddle(head){
       let slow=head, fast= head
     while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next
     }
     return slow;
}
function removeduplicate(head){
let current = head;
const value = new set()
let prev=null
while(current){
if(value.has(current.value)){
    prev.next = current.next
}else{
    value.add(current.value)
    prev = current
}
current = current.next
}

}
function findCycle(head){
    let slow = head, fast = head;
    while(fast && fast.next){
        slow= slow.next
        fast = fast.next.next
        if(fast === slow) return true
    }
        return false
    
}

function inverseLinkList(head){
let prev = null;
let current = head
while(current){
   let next = current.next;
   current.next=prev
   prev = current
   current = next
}
return prev

}

let one = new NodoList(1)
let two = new NodoList(3)
let three = new NodoList(3)
one.next = two
two.next = three
three.next = two
console.log(one)

console.log(removeduplicate(one))*/

class TreeValue{
    contructor(value){
        this.value = value;
        this.left = null;
        this.right = null
    }
}

class TreeRoot{
    constructor(root){
    this.root = null;
    }

    addNodo(value){
        const newNodo = new TreeRoot(value)
        if(!this.root){
            this.root = newNodo;
        }else{
            this.insertNodo(this.root,newNodo)
        }
    }
    insertNodo(root,newNode){
        if(newNode.value<root.value){
            if(!root.left) root.left = newNode;
            else this.insertNodo(root.left,newNode)
        }else{
            if(!root.right){
                if(!root.right) root.right = newNode;
                else this.insertNodo(root.right, newNode)
            }
        }
    }

    search(root, value){
        return this.searchNodo(root,value)
    }

    searchNodo(root, value){
        if(!root) return null;
              if(value<root.value) return this.searchNodo(root.left,value)
              else if(value> root.value) return this.searchNodo(root.right, value)
                  else return root
    }
}

function preOrder(node){
      console.log(node)
      preOrder(node.left)
      preOrder(node.right)
}

function inOrder(node){
    inOrder(node.left)
    console.log(node)
    ineOrder(node.right)
}

function postOrder(node){
    postOrder(node.left)
    postOrder(node.right)
    console.log(node)
}
