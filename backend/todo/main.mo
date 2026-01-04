import Array "mo:base/Array";
import Principal "mo:base/Principal";

persistent actor TodoList {

  public type Todo = {
    id : Nat;
    text : Text;
    completed : Bool;
    owner : Principal
  };

  var todos : [Todo] = [];
  var nextId : Nat = 0;

  // Query: Get all todos for the caller
  public query ({ caller }) func getAllTodos() : async [Todo] {
    Array.filter<Todo>(todos, func(t) { t.owner == caller })
  };

  // Mutation: Add a new todo
  public shared ({ caller }) func addTodo(text : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let newTodo : Todo = {
      id = id;
      text = text;
      completed = false;
      owner = caller
    };

    todos := Array.append<Todo>(todos, [newTodo]);
    id
  };

  // Mutation: Toggle todo completion status
  public shared ({ caller }) func toggleTodo(id : Nat) : async Bool {
    var found = false;
    todos := Array.map<Todo, Todo>(
      todos,
      func(t) {
        if (t.id == id and t.owner == caller) {
          found := true;
          { t with completed = not t.completed }
        } else {
          t
        }
      },
    );
    found
  };

  // Mutation: Delete a todo by id
  public shared ({ caller }) func deleteTodo(id : Nat) : async Bool {
    let originalLength = todos.size();
    todos := Array.filter<Todo>(
      todos,
      func(t) {
        not (t.id == id and t.owner == caller)
      },
    );
    todos.size() < originalLength
  };

  // Mutation: Clear all completed todos
  public shared ({ caller }) func clearCompleted() : async Nat {
    let originalLength = todos.size();
    todos := Array.filter<Todo>(
      todos,
      func(t) {
        if (t.owner == caller) {
          not t.completed
        } else {
          true
        }
      },
    );
    originalLength - todos.size()
  }
}
