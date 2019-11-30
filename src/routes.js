import Home from './components/pages/Home'
import UsuarioCrud from './components/pages/UsuarioCrud.vue'
import AmbienteCrud from './components/pages/AmbienteCrud.vue'
import ReservaCrud from './components/pages/ReservaCrud.vue'

export default[
    {path:'/', component:Home},
    {path:'/users', component:UsuarioCrud},
    {path:'/booking', component:ReservaCrud},
    {path:'/roons', component:AmbienteCrud}
]