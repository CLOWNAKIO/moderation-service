type AuthResponse = {
    token: {
        type: string;
        token: string;
    };
    user: {
        user_id: string;
        email: string;
        registered_at: Date;
        updated_at: Date;
        is_verified: boolean;
    };
};

type ProfileResponse = {
    profile_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    role: 'user' | 'student' | 'company' | 'admin';
    is_company_requested: boolean;
    is_company_accepted: boolean;
    api_token: string | null;
};

type AuthError = {
    detail: string;
};

type PredictionResponse = {
    predictions: Array<{
        text: string;
        toxicity: Array<{
            label: string;
            score: number;
        }>;
    }>;
};
