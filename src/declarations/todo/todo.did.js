export const idlFactory = ({ IDL }) => {
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'owner' : IDL.Principal,
    'text' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'addTodo' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'clearCompleted' : IDL.Func([], [IDL.Nat], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
    'toggleTodo' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
