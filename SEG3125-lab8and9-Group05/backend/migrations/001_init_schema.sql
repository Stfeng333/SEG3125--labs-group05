CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
  class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_code TEXT NOT NULL UNIQUE,
  class_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  course_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(class_id) ON DELETE SET NULL,
  course_code TEXT NOT NULL UNIQUE,
  course_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sections (
  section_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
  section_code TEXT NOT NULL,
  year INTEGER NOT NULL,
  semester TEXT NOT NULL CHECK (semester IN ('Winter', 'Summer', 'Fall')),
  professor_name TEXT NOT NULL,
  UNIQUE (course_id, section_code, year, semester)
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS notes (
  note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  file_url TEXT,
  author_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  class_id UUID REFERENCES classes(class_id) ON DELETE SET NULL,
  course_id UUID REFERENCES courses(course_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS note_tags (
  note_id UUID NOT NULL REFERENCES notes(note_id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

CREATE TABLE IF NOT EXISTS note_comments (
  comment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID NOT NULL REFERENCES notes(note_id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS note_ratings (
  rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID NOT NULL REFERENCES notes(note_id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (note_id, user_id)
);

CREATE TABLE IF NOT EXISTS requests (
  request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  created_by UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  class_id UUID REFERENCES classes(class_id) ON DELETE SET NULL,
  course_id UUID REFERENCES courses(course_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS request_tags (
  request_id UUID NOT NULL REFERENCES requests(request_id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
  PRIMARY KEY (request_id, tag_id)
);

CREATE TABLE IF NOT EXISTS replies (
  reply_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES requests(request_id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_follows (
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_notes_course_id ON notes(course_id);
CREATE INDEX IF NOT EXISTS idx_notes_class_id ON notes(class_id);
CREATE INDEX IF NOT EXISTS idx_requests_course_id ON requests(course_id);
CREATE INDEX IF NOT EXISTS idx_requests_class_id ON requests(class_id);
CREATE INDEX IF NOT EXISTS idx_replies_request_id ON replies(request_id);
