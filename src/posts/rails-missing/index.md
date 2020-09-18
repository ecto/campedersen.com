---
title: Missing records in Rails 6
date: 2020-09-18
---

import lid from './lid.gif';

<img src={lid} width={256} style={{float: "right"}} />

[Cunningham's Law](https://meta.wikimedia.org/wiki/Cunningham%27s_Law) says "the
best way to get the right answer on the internet is not to ask a question; it's
to post the wrong answer."

Maybe a good extension would be "the best way to get a feature in an open source
project is not to commit the code, but to complain about the lack of said
feature."

A couple of years ago I published a post about finding
[Unassociated records in Rails](/unassociated). I thought I would get around to
building out my idea of `without(:model)` someday, but you know how life goes.

Thankfully someone else found the lack of this feature annoying too. I was
googling for solutions to an unrelated problem yesterday and stumbled on the
Rails PR
[Finding Orphan Records](https://github.com/rails/rails/pull/34727/files), which
adds `missing(:model)`.

It looks like it was submitted by Tom Rossi in December 2018, but only merged in
January 2020, finding its way into Rails 6.1. The
[linked thread](https://groups.google.com/g/rubyonrails-core/c/sT8uzQb8Oa8)
indicates he and Rafael França figured this out at Rails Conf! Maybe I should go
someday 😂

The implementation is much simpler than I thought it would be, and more powerful
than I had thought to make it. It actually allows you to left join multiple
tables:

```rb
Post.where.missing(:author, :comments)

# SELECT "posts".* FROM "posts"
# LEFT OUTER JOIN "authors" ON "authors"."id" = "posts"."author_id"
# LEFT OUTER JOIN "comments" ON "comments"."post_id" = "posts"."id"
# WHERE "authors"."id" IS NULL AND "comments"."id" IS NULL
```

This was acheived in the following method in
`activerecord/lib/active_record/relation/query_methods.rb`:

```rb
def missing(*args)
  args.each do |arg|
    reflection = @scope.klass._reflect_on_association(arg)
    opts = { reflection.table_name => { reflection.association_primary_key => nil } }
    @scope.left_outer_joins!(arg)
    @scope.where!(opts)
  end

  @scope
end
```

We can see through their clever use of `_reflect_on_association` how the
previous way to do this had to be implemented:

```rb
Post
  .left_joins(:author).where(authors: {id: nil})
  .left_joins(:comments).where(comments: {id: nil})
```

It seems small but I love to see improvements like this. Rails continues to be a
masterpiece of developer ergonomics, and I'd like to thank
[Tom Rossi](https://twitter.com/tomrossi7) and
[Rafael França](https://twitter.com/rafaelfranca) for helping push it forward!
