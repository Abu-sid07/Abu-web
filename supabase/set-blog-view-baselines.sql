-- Run once if the view-count table was created with the older starting values.
-- This resets the totals to the counts supplied for this site. Do not rerun after
-- you want to preserve live increments.
update public.blog_view_counts
set views = case slug
  when 'college' then 698
  when 'chennai' then 713
  when 'kosal' then 734
  when 'teaching' then 754
end
where slug in ('college', 'chennai', 'kosal', 'teaching');
