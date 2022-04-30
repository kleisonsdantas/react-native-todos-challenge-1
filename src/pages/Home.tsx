import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find((task) => task.title === newTaskTitle);

    if(foundTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const newTask ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, done: !task.done};
      }
      return task;
    })

    setTasks([...updatedTasks]);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, title: taskNewTitle};
      }
      return task;
    })

    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja',
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Sim",
          onPress: () => setTasks([...tasks.filter((item) => item.id !== id)]),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask ={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})