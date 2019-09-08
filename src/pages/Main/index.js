import React, { Component } from 'react';
import {
  Keyboard
} from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { 
  Container, 
  Form, 
  Input,
  List, 
  Name,
  Bio,
  Avatar,
  User,
  SubmitButton,
  ProfileButton,
  ProfileButtonText 
} from '../../Components';

class Main extends Component {
  state = {
    users: [],
    newUser: "",
  }
  handleSubmit = async () => {
    const { newUser, users } = this.state;
    const res = await api.get(`/users/${newUser}`);

    const data = {
      name: res.data.name,
      login: res.data.login,
      bio: res.data.bio,
      avatar: res.data.avatar_url
    };

    this.setState({
      users: [...users, data],
      newUser: ''
    });

    Keyboard.dismiss();
  }
  render() {
    const { users, newUser } = this.state;
    return (
      <Container>
        <Form>
          <Input 
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            onSubmitEditing={this.handleSubmit}
            returnKeyLabel="send"
            returnKeyType="send"
          />
          <SubmitButton onPress={this.handleSubmit}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtrator={user => user.login}
          renderItem={({item})=>(
            <User>
              <Avatar source={{ uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={()=>({})}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
};
Main.navigationOptions = {
  title: 'Usuários'
}

export default Main;
