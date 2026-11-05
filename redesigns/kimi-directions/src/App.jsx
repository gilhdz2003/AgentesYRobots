import PrototypeSwitcher from './components/PrototypeSwitcher.jsx'
import SystemConcept from './concepts/SystemConcept.jsx'
import FirmConcept from './concepts/FirmConcept.jsx'
import LabConcept from './concepts/LabConcept.jsx'
import DirectionsIndex from './DirectionsIndex.jsx'

const routes = {
  sistema: SystemConcept,
  firma: FirmConcept,
  lab: LabConcept,
}

function getRoute() {
  return new URLSearchParams(window.location.search).get('v') || ''
}

export default function App() {
  const route = getRoute()
  const Concept = routes[route]

  if (!Concept) return <DirectionsIndex />

  return (
    <>
      <PrototypeSwitcher current={route} />
      <Concept />
    </>
  )
}
