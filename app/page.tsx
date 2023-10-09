import LogButton from './log-example'

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen justify-center items-center gap-4'>
      <h1 className='text-3xl font-bold'>Event Planner</h1>
      <LogButton />
    </main>
  )
}
