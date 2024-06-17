import { auth, dbRealTime } from '../configs/firebaseConfig';
import { ref, get, set } from 'firebase/database';

export const saveScoreToFirebase = async (score: number) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error('User not authenticated or not found.');
            return;
        }

        const userId = user.uid;
        const userScoresRef = ref(dbRealTime, `users/${userId}/scores`);

        // Get current scores
        const snapshot = await get(userScoresRef);
        let scores = snapshot.exists() ? snapshot.val() : [];

        // Add new score to scores array
        scores.push(score);

        // Sort scores in descending order
        scores.sort((a: number, b: number) => b - a);

        // Limit to top 10 scores
        scores = scores.slice(0, 10);

        // Update scores in Firebase
        await set(userScoresRef, scores);
        console.log('Scores updated successfully:', scores);
    } catch (error) {
        console.error('Error saving score to Firebase:', error);
    }
};