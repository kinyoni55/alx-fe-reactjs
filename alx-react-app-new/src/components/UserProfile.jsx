function USerProfile(props) {
    return (
        props.name && props.age && props.bio ? (
            <UserProfile name={props.name} age={props.age} bio={props.bio} />
        ) : (
            <p>Please provide valid user information.</p>
        )
    )
}

 const UserProfile = (props) => {
   return (

      <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
          <h2 style={{ color: 'blue' }}>{props.name}</h2>
          <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
          <p>Bio: {props.bio}</p>
      </div>
   );
 };

export default USerProfile;