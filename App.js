import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([
    { text: 'Learn React Native like a pro', key: '1', completed: false },
    { text: 'Build a to-do app', key: '2', completed: true },
    { text: 'Entregar desafio de coder', key: '3', completed: true },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, { text: newTodo, key: Date.now(), completed: false }]);
    setNewTodo('');
  };

  const completeTodo = (key) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === key) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (key) => {
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <Button disabled={!newTodo} title='Add' color='#333' onPress={addTodo} />
      </View>

      <Text style={styles.title}>TODO LIST</Text>
      <Text style={styles.paragraph}>Para marcar como completadas las tareas, presionar sobre la tarea. Para eliminar la tarea, presionar "delete".</Text>

      <FlatList style={styles.todoList}
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => completeTodo(item.key)}>
              <Text style={[styles.textTodo, item.completed ? styles.completed : null]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.key)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  todoList: {
    marginTop: 25,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
  },
  textTodo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 20,
  },
  input: {
    width: '75%',
    borderBottomColor: '#626893',
    borderBottomWidth: 1,
    height: 40,
    color: '#212121'
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  delete: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'red',
  },
});

export default App;
