import { Home, About, Todo, Redux, Pixi } from '../components/pages/';

export default {
  routes: [
    { label: 'Home', component: Home, location: '/' },
    { label: 'About', component: About, location: '/about' },
    { label: 'Todo', component: Todo, location: '/todo' },
    { label: 'Redux', component: Redux, location: '/redux' },
    { label: 'Pixi', component: Pixi, location: '/pixi' },
  ],
  userTestUsers: [],
  userTestPhotos: [],
};
