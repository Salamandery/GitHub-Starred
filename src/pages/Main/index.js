import React, { Component } from 'react';
import {
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import proptypes from 'prop-types';
import storage from '@react-native-community/async-storage';
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
  static navigationOptions = {
    title: 'Usuários'
  }
  static proptypes = {
    navigation: proptypes.shape({
      navigate: proptypes.func,
    }).isRequired,

  }
  state = {
    users: [],
    newUser: "",
    loading: false,
  }
  async componentDidMount() {
    const res = await storage.getItem('users');

    if (res) {
      this.setState({users: JSON.parse(res)});
    }
  }
  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if(prevState.users !== users) {
      storage.setItem('users', JSON.stringify(users));
    }

  }
  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', {user});
  }
  handleSubmit = async () => {
    const { newUser, users } = this.state;
    this.setState({loading: true});
    const res = await api.get(`/users/${newUser}`);

    const data = {
      name: res.data.name,
      login: res.data.login,
      bio: res.data.bio,
      avatar: res.data.avatar_url
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false
    });

    Keyboard.dismiss();
  }
  render() {
    const { users, newUser, loading } = this.state;
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
          <SubmitButton loading={loading} onPress={this.handleSubmit}>
            { loading ? <ActivityIndicator color="#fff" /> : <Icon name="add" size={20} color="#fff" /> }
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={item => item.login}
          renderItem={({item})=>(
            <User>
              <Avatar source={{ uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
};

export default Main;
