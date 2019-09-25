select * into tempcats from cats
alter table tempcats drop cat_id
select * from tempcats

insert into animals 
	select * from dogs
		UNION 
	select * from tempcats
        ;
		
	