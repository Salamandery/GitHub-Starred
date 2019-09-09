import React, {
  useEffect,
  useState
} from 'react';
import proptypes from 'prop-types';
import {
  Container, 
  Avatar,
  Bio,
  Name,
  Header,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Stars
} from './style';
import api from '../../services/api';

class User extends React.Component {
  static navigationOptions = ({navigation}) =>({
    title: navigation.state.params.user.name
  });
  static proptypes = {
    navigation: proptypes.shape({
      navigate: proptypes.func,
    }).isRequired,
  }
  state = {
    stars: [],
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const res = await api.get(`/users/${user.login}/starred`);

    if (res) {
      this.setState({
        stars: res.data
      })
    }
  }
  renderItem = ({item}) => {
    console.log(item.owner.avatar_url)
    return(
      <Starred>
        <OwnerAvatar source={{uri: item.owner.avatar_url}} />
        <Info>
          <Title>{item.name}</Title>
          <Author>{item.owner.login}</Author>
        </Info>
      </Starred>
    )
  }
  render() {
    const { stars } = this.state;
    const user = this.props.navigation.getParam('user');

    return (
      <Container> 
        <Header>
            <Avatar source={{ uri: user.avatar}} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>
        </Header>
        <Stars 
            data={stars}
            keyExtractor={stars => String(stars.id)}
            renderItem={this.renderItem}
        />

      </Container>
    );
  }
};

export default User;
