PGDMP         	    
        
    z            poc-ts    14.5    14.5 >    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    16567    poc-ts    DATABASE     S   CREATE DATABASE "poc-ts" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE "poc-ts";
                postgres    false            ?            1259    16623    genres    TABLE     ?   CREATE TABLE public.genres (
    id integer NOT NULL,
    "movieId" integer NOT NULL,
    genre character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.genres;
       public         heap    postgres    false            ?            1259    16622    genres_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.genres_id_seq;
       public          postgres    false    212            O           0    0    genres_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;
          public          postgres    false    211            ?            1259    16644    moviePlataform    TABLE     ?   CREATE TABLE public."moviePlataform" (
    id integer NOT NULL,
    "movieId" integer NOT NULL,
    "plataformId" integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public."moviePlataform";
       public         heap    postgres    false            ?            1259    16643    moviePlataform_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."moviePlataform_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."moviePlataform_id_seq";
       public          postgres    false    216            P           0    0    moviePlataform_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."moviePlataform_id_seq" OWNED BY public."moviePlataform".id;
          public          postgres    false    215            ?            1259    16679    movieStatus    TABLE     ?  CREATE TABLE public."movieStatus" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    status character varying(255) DEFAULT 'Unwatched'::character varying NOT NULL,
    "watchCount" integer DEFAULT 0 NOT NULL,
    rating integer,
    comments text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "movieStatus_rating_check" CHECK (((rating >= 1) AND (rating <= 10)))
);
 !   DROP TABLE public."movieStatus";
       public         heap    postgres    false            ?            1259    16678    movieStatus_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."movieStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."movieStatus_id_seq";
       public          postgres    false    220            Q           0    0    movieStatus_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."movieStatus_id_seq" OWNED BY public."movieStatus".id;
          public          postgres    false    219            ?            1259    16605    movies    TABLE     ?   CREATE TABLE public.movies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.movies;
       public         heap    postgres    false            ?            1259    16604    movies_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public          postgres    false    210            R           0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
          public          postgres    false    209            ?            1259    16636 
   plataforms    TABLE     ?   CREATE TABLE public.plataforms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.plataforms;
       public         heap    postgres    false            ?            1259    16635    plataforms_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.plataforms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.plataforms_id_seq;
       public          postgres    false    214            S           0    0    plataforms_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.plataforms_id_seq OWNED BY public.plataforms.id;
          public          postgres    false    213            ?            1259    16702    sessions    TABLE     ?   CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL,
    active boolean DEFAULT true,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            ?            1259    16701    sessions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    222            T           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    221            ?            1259    16662    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    16661    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            U           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            ?           2604    16626 	   genres id    DEFAULT     f   ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);
 8   ALTER TABLE public.genres ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            ?           2604    16647    moviePlataform id    DEFAULT     z   ALTER TABLE ONLY public."moviePlataform" ALTER COLUMN id SET DEFAULT nextval('public."moviePlataform_id_seq"'::regclass);
 B   ALTER TABLE public."moviePlataform" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            ?           2604    16682    movieStatus id    DEFAULT     t   ALTER TABLE ONLY public."movieStatus" ALTER COLUMN id SET DEFAULT nextval('public."movieStatus_id_seq"'::regclass);
 ?   ALTER TABLE public."movieStatus" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            ?           2604    16608 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            ?           2604    16639    plataforms id    DEFAULT     n   ALTER TABLE ONLY public.plataforms ALTER COLUMN id SET DEFAULT nextval('public.plataforms_id_seq'::regclass);
 <   ALTER TABLE public.plataforms ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            ?           2604    16705    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            ?           2604    16665    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            >          0    16623    genres 
   TABLE DATA                 public          postgres    false    212   ,E       B          0    16644    moviePlataform 
   TABLE DATA                 public          postgres    false    216   G       F          0    16679    movieStatus 
   TABLE DATA                 public          postgres    false    220   ?H       <          0    16605    movies 
   TABLE DATA                 public          postgres    false    210   ?I       @          0    16636 
   plataforms 
   TABLE DATA                 public          postgres    false    214   ?K       H          0    16702    sessions 
   TABLE DATA                 public          postgres    false    222   ?L       D          0    16662    users 
   TABLE DATA                 public          postgres    false    218   	S       V           0    0    genres_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.genres_id_seq', 32, true);
          public          postgres    false    211            W           0    0    moviePlataform_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."moviePlataform_id_seq"', 53, true);
          public          postgres    false    215            X           0    0    movieStatus_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."movieStatus_id_seq"', 11, true);
          public          postgres    false    219            Y           0    0    movies_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.movies_id_seq', 25, true);
          public          postgres    false    209            Z           0    0    plataforms_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.plataforms_id_seq', 9, true);
          public          postgres    false    213            [           0    0    sessions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sessions_id_seq', 39, true);
          public          postgres    false    221            \           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    217            ?           2606    16629    genres genres_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
       public            postgres    false    212            ?           2606    16650 "   moviePlataform moviePlataform_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."moviePlataform"
    ADD CONSTRAINT "moviePlataform_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."moviePlataform" DROP CONSTRAINT "moviePlataform_pkey";
       public            postgres    false    216            ?           2606    16690    movieStatus movieStatus_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."movieStatus"
    ADD CONSTRAINT "movieStatus_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."movieStatus" DROP CONSTRAINT "movieStatus_pkey";
       public            postgres    false    220            ?           2606    16613    movies movies_name_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_name_key UNIQUE (name);
 @   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_name_key;
       public            postgres    false    210            ?           2606    16611    movies movies_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
       public            postgres    false    210            ?           2606    24760    plataforms plataforms_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.plataforms
    ADD CONSTRAINT plataforms_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.plataforms DROP CONSTRAINT plataforms_name_key;
       public            postgres    false    214            ?           2606    16642    plataforms plataforms_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.plataforms
    ADD CONSTRAINT plataforms_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.plataforms DROP CONSTRAINT plataforms_pkey;
       public            postgres    false    214            ?           2606    16709    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    222            ?           2606    16672    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    218            ?           2606    16670    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            ?           2606    16630    genres genres_movieId_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT "genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id);
 F   ALTER TABLE ONLY public.genres DROP CONSTRAINT "genres_movieId_fkey";
       public          postgres    false    210    3481    212            ?           2606    16651 *   moviePlataform moviePlataform_movieId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."moviePlataform"
    ADD CONSTRAINT "moviePlataform_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id);
 X   ALTER TABLE ONLY public."moviePlataform" DROP CONSTRAINT "moviePlataform_movieId_fkey";
       public          postgres    false    216    210    3481            ?           2606    16656 .   moviePlataform moviePlataform_plataformId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."moviePlataform"
    ADD CONSTRAINT "moviePlataform_plataformId_fkey" FOREIGN KEY ("plataformId") REFERENCES public.plataforms(id);
 \   ALTER TABLE ONLY public."moviePlataform" DROP CONSTRAINT "moviePlataform_plataformId_fkey";
       public          postgres    false    216    214    3487            ?           2606    16696 $   movieStatus movieStatus_movieId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."movieStatus"
    ADD CONSTRAINT "movieStatus_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id);
 R   ALTER TABLE ONLY public."movieStatus" DROP CONSTRAINT "movieStatus_movieId_fkey";
       public          postgres    false    210    3481    220            ?           2606    16691 #   movieStatus movieStatus_userId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."movieStatus"
    ADD CONSTRAINT "movieStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 Q   ALTER TABLE ONLY public."movieStatus" DROP CONSTRAINT "movieStatus_userId_fkey";
       public          postgres    false    220    218    3493            ?           2606    16710    sessions sessions_userId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_fkey";
       public          postgres    false    218    222    3493            >   ?  x???Mk1?????	l??H???M?PRH??U{?,???q????es??}yͫW?}|~xڙ????????q?ۗ~??7s;:ss:?????3׿;???z??rg~l?~x6???̺?é^????D???sqP-?@??w?V[UH?@????????:?>T???rQK????㥾?{oz(dҔX?|L?&?6y???L???
8K?3?mT@?ETm? ?P?a????T?}??ra??H-F?EmWu??ϮYFEf=T???]???Κr?9??NQ?Ԇ]8?X(Z???K#d?v?4??4I?e??E?lI
Kh.6e?3j;????:??<RC[?Z=?^??x?gX?76Yo?2'?2+U?-??a?I[??X. ?D???	I?"??;\?XT????j]??h??}WQ^?n??\??x???<r,&?p?????JW?C      B   ?  x???KKC1????nCf2?d??EQ񵯶BAi???wr??6]dqo??8??cq?4|v???{??y?ܼ????w?~?\???ﯩ?ܬw?]?????߿???z??_?כۗ?????鉃???8?Ap 5?ɞ?_\]O&p???(???qD??ɓp?hG?????:A??#I";8??+d_?C6??']z??x??0vu?Xx?x?P4w;??8???E2?W???T??? ?a??y?g??}̒?o?u????|4?+x???R9z@dC?Z?˗
?9?l?Ӟ{|??g)??S?>9?c??4?????l]>???Z??ۏ???._?_󗄖+???;^????jL??e???F_<??5j?? C1????'??????????'???i??      F   D  x?œ?J?0?????t?rrڴ?W"?(?	n???F-???R? >?/f??To
??p???_??j~??t???m??
???SeV6??΃iU??;ӥ?粡9??a??-/۾?????j(ں6?u??3?5engps???+???w??o˦??HWxy?U??}??l?.?????s??B?!? ?5F:??L?ҟ?O?Q?Dл???U?????] O4???!*Lp<t?/?Hsb$H?4z<????A8ďԡԂ???F?Vh:????'?J#?<f$?????????A :???????o~?????g?R???+?	??      <   ?  x???Ko?0????9?Kr??)u??m???;c?Z=
Y2?_?@Uy*?????????~?r ۧ??kzm?#m?sN䦮V??mX???*?ޒo??_7{r+?\?]??4~?8?????rȨmP-o?-????q???x⻊?y???<?{?e??1N??L?@E???'@܋k%m	B???0\?s??a ?/K2???t	??Y<???U/A?9JdQ50+JX???OS??u?"??Bn?(?黴O?$?9OHt?S0ht??!?}=?Pe?1EQ
	e??A??,&??
?,SM?????4?C݆H'o&4+?SA?S]?n$?s?dX?	?ȌUe?SsV6Iơ????(jH??m?\e?!C%jSV??????~???%?	i???)????Lu3^??V??????)?C}C??q@&9?ί%ב}??a???sD?R??W&ZJ???O?bF?1???Pez???o??'y???6??ʊu-???????7???1      @   ?   x??ѽn?0??=Wq??,?$v:?@4R? ??0R$?GI?J???s:y;??????r? ˫????W?[=?{74#,?[?nL???????????k_?#s3?m???Q?V?+??*?q*$??+???{?y@??7???Z8ucf???P%???]{W??y??>?*I)',VȽ?	W/'=?O!Ecdܗ?]?`?K?,???? 2Q?????????@u~???߬DH??R?????Y?1BQr?^N?d???      H   ?  x???ˊ$?????6#AGrnq???B?#?%{Wl$3=????]9?N?????t}??????_~????>????o??????o????????~?<^n?|{?_>?^n_??????V?????/??e֯sԯ????׿???_o???M_n%F????C?.?3??????????D3~nBw???F?K?????ç+???7̨g???x??GhT%?٬???>??????[J??????/{???
?f_??ҠPc/$?G?'|Q???????ǩ?K?S
?s????a2)?RN??]?,?r??૭???;q0?J?$5׹z^?8??)?I7??????c~?g4????_혟?f?d?4?U??c?+?I?3?t9_?>?Tkk1??YBÂM??vi????????FY???|?rÊ?j???Hf???^C??6rm??_?;?M???[???	?+?W)???T}Hn????]??|+?d?~~L@?2????2????3?7~??^?7?0ߙ7l????G??,=cV???Y?C??#G?[?*'~D???? ???e+k?G?????Z?l?M??O?δqV??Ȑ8[??bHj??d?x???xҴ??8,?3???v=?"ޢ?9Z?j0?^[(?Z?Z?f߭?t?FwN???<R$:??CZłM??/?̘?WaI'.@?7r???<bd???0??	?䆆P??R??<?;?M=?t???#-{?NW??,V<???	RYeƨ???H ???5????Ĳ???0e?????s_tʧwɛ?T??s|?,?qM?\1@?P$?/4?Ӝ?6d?V?>ç?xD????*\?F??????5??a?7?MP?.OHb9?d$#??Ů?*c?OM??S???O #0????G?T???B???Z$?????|5ϧ??ξEr??}Z? ?8???a????B('Ӏ??+jhR}??? ?H?gx=?$?i(\?p??š??Q?(?א??5?f?&?t}??#Hj???C???č?0?\??ٵ???o???sI? ??k,¡0/ .??ެ??x,??{s,w?6????#Gr?p?Sl??$Ǖ?p*??O7q/?W3?l?8HR??LAƙ?I??<$?dG??"?? #?"??؟`??(u_?n?cO:???o????o?? #K6͹??]F?X ?	/	K`0?k???S?"?ʚ?m0??b??? ??#??m0???B??S?a&?I(???)?A&??)O([*??22?7h??w?'?$?ɜ?;??S?????:?_???{?o?B?E<?y??1?%qD?]o?j???? ??([?.|"
?^H?V?|??; nN'}?[?@?]?J?(?X ⊫?,:Z??Osd???)W??c?u??|? ?g-????a6????N?VD獅??U??2Kt?ac?i??\?hǯ??|žkD??oN??"??c$?>m0'\??J?=֎?0?8?? ?>????)?$?}z??۫?5?Wӈ;?w r+??9S?=??g&????>????F      D     x???˒?0@?~?쮲#y?????u? ?G?~??M[.???T6????sk?\	?|eY?ơJ?\x????S??㶐1οӼ?????ϊwa?M??%????Z	+X?????E?? x??~&????:?UHT,?)B??_?E?ʤ?X????~N?Dn?M??_yo&?8??g!???????m?????|}??????ѽL+x???*UDE]?ȯ????ϒ0??N????vGt??/'?a???e4??tq?4''4?;??m?͆?i2Sz??IT%(???Wv?ʴ:?8?wgQ???????N??????;??)????7?=?;?;.h߈?6?????+$??*J*V ??P????*Ӹ?????;<????R,z;>X?0???a????y??]??5y?k?????0L{??Y%??BYye?\??4?C???Ryv?||6?s;|?#??-m?.?]ʹ>/%?ć?8ڸ??|,A???"QE??4? dZSm     