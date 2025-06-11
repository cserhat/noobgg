CREATE TYPE "public"."event_type" AS ENUM('meetup', 'tournament', 'other');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "public"."lobby_type" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"title" varchar(150) NOT NULL,
	"description" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"place" varchar(255),
	"is_online" boolean DEFAULT false NOT NULL,
	"image_url" varchar(255),
	"is_official" boolean DEFAULT false NOT NULL,
	"creator_id" bigint NOT NULL,
	"min_age_restriction" integer,
	"attendees_count" integer DEFAULT 0 NOT NULL,
	"language_id" bigint,
	"country_id" bigint,
	"city_id" bigint,
	"event_type" "event_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_attendees" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "event_attendees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"event_id" bigint NOT NULL,
	"user_profile_id" bigint NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_invitations" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "event_invitations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"inviter_id" bigint NOT NULL,
	"invitee_id" bigint NOT NULL,
	"event_id" bigint NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"responded_at" timestamp with time zone,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "languages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"name" varchar(100) NOT NULL,
	"code" varchar(10) NOT NULL,
	"flag_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "lobbies" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lobbies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"game_id" bigint NOT NULL,
	"region_id" bigint NOT NULL,
	"mode_id" bigint NOT NULL,
	"min_team_size" integer NOT NULL,
	"max_team_size" integer NOT NULL,
	"type" "lobby_type" DEFAULT 'public' NOT NULL,
	"min_rank_id" bigint,
	"max_rank_id" bigint,
	"is_mic_required" boolean DEFAULT false NOT NULL,
	"creator_id" bigint NOT NULL,
	"owner_id" bigint NOT NULL,
	"note" text,
	"discord_link" varchar(255),
	"row_version" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lobby_languages" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lobby_languages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"lobby_id" bigint NOT NULL,
	"language_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lobby_members" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lobby_members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"lobby_id" bigint NOT NULL,
	"member_id" bigint NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_distributors" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "game_distributors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"game_id" bigint NOT NULL,
	"distributor_id" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game_ranks" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "game_ranks" ALTER COLUMN "id" SET MAXVALUE 2147483647;--> statement-breakpoint
ALTER TABLE "game_ranks" ALTER COLUMN "game_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "fk_events_creator_id" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_attendees" ADD CONSTRAINT "fk_event_attendees_event_id" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_attendees" ADD CONSTRAINT "fk_event_attendees_user_profile_id" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_invitations" ADD CONSTRAINT "fk_event_invitations_event_id" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_invitations" ADD CONSTRAINT "fk_event_invitations_inviter_id" FOREIGN KEY ("inviter_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_invitations" ADD CONSTRAINT "fk_event_invitations_invitee_id" FOREIGN KEY ("invitee_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_mode_id" FOREIGN KEY ("mode_id") REFERENCES "public"."game_modes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_min_rank_id" FOREIGN KEY ("min_rank_id") REFERENCES "public"."game_ranks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_max_rank_id" FOREIGN KEY ("max_rank_id") REFERENCES "public"."game_ranks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_creator_id" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobbies" ADD CONSTRAINT "fk_lobbies_owner_id" FOREIGN KEY ("owner_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobby_languages" ADD CONSTRAINT "fk_lobby_languages_lobby_id" FOREIGN KEY ("lobby_id") REFERENCES "public"."lobbies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobby_languages" ADD CONSTRAINT "fk_lobby_languages_language_id" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobby_members" ADD CONSTRAINT "fk_lobby_members_lobby_id" FOREIGN KEY ("lobby_id") REFERENCES "public"."lobbies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lobby_members" ADD CONSTRAINT "fk_lobby_members_member_id" FOREIGN KEY ("member_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_distributors" ADD CONSTRAINT "fk_game_distributors_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_distributors" ADD CONSTRAINT "fk_game_distributors_distributor_id" FOREIGN KEY ("distributor_id") REFERENCES "public"."distributors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_creator_id_idx" ON "events" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "events_start_time_idx" ON "events" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "events_event_type_idx" ON "events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "event_attendees_event_id_idx" ON "event_attendees" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "event_attendees_user_profile_id_idx" ON "event_attendees" USING btree ("user_profile_id");--> statement-breakpoint
CREATE INDEX "event_invitations_event_id_idx" ON "event_invitations" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "event_invitations_inviter_id_idx" ON "event_invitations" USING btree ("inviter_id");--> statement-breakpoint
CREATE INDEX "event_invitations_invitee_id_idx" ON "event_invitations" USING btree ("invitee_id");--> statement-breakpoint
CREATE INDEX "languages_name_idx" ON "languages" USING btree ("name");--> statement-breakpoint
CREATE INDEX "languages_code_idx" ON "languages" USING btree ("code");--> statement-breakpoint
CREATE INDEX "lobbies_game_id_idx" ON "lobbies" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "lobbies_region_id_idx" ON "lobbies" USING btree ("region_id");--> statement-breakpoint
CREATE INDEX "lobbies_mode_id_idx" ON "lobbies" USING btree ("mode_id");--> statement-breakpoint
CREATE INDEX "lobbies_creator_id_idx" ON "lobbies" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "lobbies_owner_id_idx" ON "lobbies" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "lobby_languages_lobby_id_idx" ON "lobby_languages" USING btree ("lobby_id");--> statement-breakpoint
CREATE INDEX "lobby_languages_language_id_idx" ON "lobby_languages" USING btree ("language_id");--> statement-breakpoint
CREATE INDEX "lobby_members_lobby_id_idx" ON "lobby_members" USING btree ("lobby_id");--> statement-breakpoint
CREATE INDEX "lobby_members_member_id_idx" ON "lobby_members" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "game_distributors_game_id_idx" ON "game_distributors" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "game_distributors_distributor_id_idx" ON "game_distributors" USING btree ("distributor_id");