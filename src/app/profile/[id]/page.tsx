export default function UserProfile({params}: any) {
  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-2xl pe-2 text-4xl">Profile</h1>
        <hr />
        <p className='text-4xl'>
          <span
            className='p-2 rounded bg-orange-500 text-black'
          >
            Hello, <span className="capitalize">{params.id}</span> 
          </span>
        </p>
    </div>
  )
}