import './App.css'
import Header from './components/header/Header'
import Body from './components/body/Body'
import CreateTransaction from './components/menu/CreateTransaction'
function App() {

  return (
    <div className="bg-[radial-gradient(at_0%_0%,hsl(221_83%_53%_/_0.1)_0px,transparent_50%),
    radial-gradient(at_100%_0%,hsl(280_65%_60%_/_0.08)_0px,transparent_50%),
    radial-gradient(at_100%_100%,hsl(174_72%_56%_/_0.05)_0px,transparent_50%)]
    min-h-screen container m-auto flex flex-col gap-8 py-8">
      <header>
        <Header/>
      </header>
      <CreateTransaction/>
      <Body/>
      
    </div>
  )
}

export default App
