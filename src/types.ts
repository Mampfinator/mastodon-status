interface Emoji {
    shortcode: string;
    url: string; 
    static_url: string;
    visible_in_picker: boolean;
}

interface Field {
    name: string;
    value: string; 
    verified_at: string; // Date string
}

interface Rule {
    id: string; 
    text: string;
}

export interface InstanceResponse {
    uri: string;
    title: string;
    short_description: string;
    description: string;
    email: string;
    version: string;

    urls: Record<string, string>;
    stats: {
        user_count: number;
        status_count: number;
        domain_count: number;
    }

    thumbnail: string;

    languages: string[];
    registrations: boolean;
    approval_required: boolean;
    invites_enabled: boolean;

    configuration: {
        accounts: {
            max_featured_tags: number;
        }

        statuses: {
            max_characters: 500;
            max_media_attachments: 4;
            characters_reserved_per_url: 23;
        }

        media_attachments: {
            supported_mime_types: string[],
            image_size_limit: number;
            image_matrix_limit: number;
            video_size_limit: number;
            video_frame_rate_limit: number;
            video_matrix_limit: number;
        }

        poll: {
            max_options: number;
            max_characters_per_option: number;
            min_expiration: 300;
            max_expiration: 2629746;
        }
    }

    contact_account: {
        id: string;
        username: string;
        acct: string; 
        display_name: string;
        locked: boolean;
        bot: boolean;
        discoverable: boolean;
        group: boolean;
        created_at: string // Date string
        note: string;
        url: string; 
        avatar: string; 
        avatar_static: string;
        header: string;
        header_static: string;
        followers_count: number; 
        following_count: number;
        statuses_count: number; 
        last_status_at: string; // Date string (just yyyy-mm-dd)
        noindex: boolean;
        emojis: Emoji[];
        fields: Field[];
    }
}


export interface Activity {
    week: string;
    statuses: string; 
    logins: string; 
    registrations: string;
}