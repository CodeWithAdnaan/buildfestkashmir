/**
 * Hand-authored placeholder for the generated Supabase types.
 * Once the project is linked, replace this file with:
 *
 *   npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
 *
 * Shape mirrors supabase/schema.sql & migrations so the app compiles correctly
 * and the migration to generated types later is a drop-in swap.
 */
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          date: string;
          author: string;
          author_role: string;
          read_time: string;
          tags: string[];
          gradient: string;
          image: string | null;
          content: string[];
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          date: string;
          author: string;
          author_role: string;
          read_time: string;
          tags?: string[];
          gradient: string;
          image?: string | null;
          content?: string[];
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string;
          full_name: string;
          avatar_url: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          college: string | null;
          role: "user" | "organizer" | "admin";
        };
        Insert: {
          id: string;
          updated_at?: string;
          full_name: string;
          avatar_url?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          college?: string | null;
          role?: "user" | "organizer" | "admin";
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          status: "upcoming" | "past";
          description: string;
          overview: string;
          venue: string;
          city: string;
          start_date: string;
          end_date: string;
          prize_pool: string;
          team_size: string;
          registration_open: boolean;
          themes: string[];
          schedule: any;
          speakers: any;
          mentors: any;
          sponsors: any;
          prizes: any;
          gallery_tiles: number;
          attendees: number | null;
          projects_shipped: number | null;
          is_tentative: boolean;
          date_label: string | null;
          venue_label: string | null;
          banner_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline: string;
          status: "upcoming" | "past";
          description: string;
          overview: string;
          venue: string;
          city?: string;
          start_date: string;
          end_date: string;
          prize_pool?: string;
          team_size?: string;
          registration_open?: boolean;
          themes?: string[];
          schedule?: any;
          speakers?: any;
          mentors?: any;
          sponsors?: any;
          prizes?: any;
          gallery_tiles?: number;
          attendees?: number | null;
          projects_shipped?: number | null;
          is_tentative?: boolean;
          date_label?: string | null;
          venue_label?: string | null;
          banner_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      registrations: {
        Row: {
          id: string;
          created_at: string;
          event_slug: string;
          full_name: string;
          email: string;
          college: string;
          branch: string;
          experience_level: "beginner" | "intermediate" | "advanced";
          github_url: string | null;
          linkedin_url: string | null;
          discord_handle: string | null;
          team_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          event_slug: string;
          full_name: string;
          email: string;
          college: string;
          branch: string;
          experience_level: "beginner" | "intermediate" | "advanced";
          github_url?: string | null;
          linkedin_url?: string | null;
          discord_handle?: string | null;
          team_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["registrations"]["Insert"]>;
        Relationships: [];
      };
      team_applications: {
        Row: {
          id: string;
          created_at: string;
          role: string;
          full_name: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          role: string;
          full_name: string;
          email: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["team_applications"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
