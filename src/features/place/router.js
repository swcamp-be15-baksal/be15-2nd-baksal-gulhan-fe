import PlaceView from '@/features/place/views/PlaceView.vue';
import PlaceDetailView from '@/features/place/views/PlaceDetailView.vue';


export const placeRoutes = [
  {
    path: '/place',
    name: 'place',
    component: PlaceView
  },
  {
    path: '/place/:id',
    name: 'place-detail',
    component: PlaceDetailView,
  },
];
