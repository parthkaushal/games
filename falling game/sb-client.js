
// Your Supabase code here
const supabaseClient = supabase.createClient('https://logcyvpqzeqxxhwszqws.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZ2N5dnBxemVxeHhod3N6cXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MDcxNDUsImV4cCI6MjA3MTE4MzE0NX0.eGwdePwP955fPdR3Qlm7Fck9qH-f6JFUAyiPvDmVT1s');
console.log('Supabase client created:', supabaseClient);

// const { data, error } = await supabase.auth.signInWithPassword({
//   email: 'parth.kaushal.007@gmail.com',
//   password: 'harekrishna',
// })

// console.log('Sign-in response:', { data, error });

async function saveScore(auth_user, score) {
    console.log('Saving score:', score, 'for user:', auth_user);

    if (!auth_user || auth_user.length === 0) {
        console.error('User not authenticated. Cannot save score.');
        return;
    }


    const { data: user, error: us_error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('uid', auth_user.id) // Assuming user_id is 1 for demonstration
    console.log('Data from users table:', { user, us_error });
    if (!user || user.length === 0) {
        console.error('User does not exist in users table. Cannot save score.');
        return;
    }


    const { data: u_data, error: u_error } = await supabaseClient
        .from('scores')
        .select()
        .eq('user_id', user[0].id) // Assuming user_id is 1 for demonstration
        .eq('game_id', 2); // Assuming game_id is 2 for demonstration

    console.log('Data from games table:', { u_data, u_error });
    if (u_data && u_data.length > 0) {
        console.log('User and game exist, proceeding to increment score.');
        const { data, error } = await supabaseClient
            .from('scores')
            .update({ score: u_data[0].score + score })
            .eq('user_id', user[0].id) // Assuming user_id is 1 for demonstration
            .eq('game_id', 2); // Assuming game_id is 2 for demonstration
    } else {
        console.error('User or game does not exist, inserting new score.');

        supabaseClient
            .from('scores')
            .insert([{ user_id: user[0].id, game_id: 2, score: score }]) // Assuming user_id and game_id are known
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error saving score:', error);
                } else {
                    console.log('Score saved successfully:', data);
                }
            });
        return;
    }
}

async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing in:', error);
        return null;
    }

    console.log('Sign-in successful:', data);
    globalThis.user = data.user;
    console.log('Root user set:', globalThis.user);
    return data.user;
}