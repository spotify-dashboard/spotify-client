import React from 'react';
import Navbar from '../../Global/Navbar/Navbar.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import styles from './main.module.scss';

const Main = props => {
    return(
        <div className={styles.mainSection}>
            <div className={styles.mainModule}>
                <Banner profile={props.profile} />
                <Navbar />
                <h1>Main Section</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis porta leo. Vivamus quis mauris vel quam tristique egestas ut non tortor. Cras lectus mi, blandit id finibus id, viverra eu lorem. Nullam ornare finibus fringilla. Nullam metus sapien, tincidunt eget magna eget, venenatis euismod erat. Sed vel nulla facilisis, molestie augue sit amet, maximus orci. Nunc non lacus nisi. Donec enim metus, accumsan ut ornare vel, feugiat ac purus. Morbi posuere, velit malesuada rutrum iaculis, nulla mi bibendum mi, gravida tristique justo enim eu ex. Praesent a nunc in lacus pulvinar rhoncus. Quisque ornare nisi id maximus dapibus. Pellentesque vestibulum sapien et felis egestas congue. Nullam laoreet egestas ex, a convallis elit maximus ut.

Maecenas non maximus enim. Nunc tempus pretium sem, non tempus lectus fringilla id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam lacinia nisi ut pretium suscipit. Duis euismod enim non dolor malesuada, sed eleifend sem vulputate. Nulla tincidunt sed neque non porttitor. In consequat ex est, tempor tempus risus mollis nec. Vestibulum vitae tristique massa. Phasellus condimentum nulla massa. Mauris fermentum sapien massa, id malesuada lectus dapibus at. Vestibulum vitae tellus sit amet felis placerat fringilla vitae eget velit. Ut blandit neque velit, id elementum ex consequat at. Vivamus interdum turpis eu vehicula pharetra. Nulla sed tortor risus. Aliquam vitae iaculis urna.

Fusce ullamcorper lectus sed molestie ornare. Cras dictum urna sit amet massa pharetra, dapibus scelerisque orci semper. Duis neque lacus, pellentesque vitae sem non, cursus convallis ex. Pellentesque eget tortor ac neque gravida efficitur eget id nulla. Praesent quis enim sit amet sem eleifend consectetur. Nulla nec vulputate nulla. Nullam ultricies dictum dui, a egestas quam tempor a. Integer eget tortor turpis. Praesent lectus neque, mollis sed est ac, consequat tincidunt nibh. Ut convallis sagittis dolor. Pellentesque id varius metus. Aliquam nec consectetur mi, non fermentum nulla.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vel orci ut nibh tempus ultricies at in leo. Aliquam tristique nisi vitae ligula egestas suscipit a nec sem. Integer cursus velit neque, vitae porttitor metus ullamcorper eu. Fusce tincidunt elit vitae lectus scelerisque, condimentum ornare est luctus. Etiam bibendum arcu neque, eu imperdiet leo tincidunt at. Praesent tortor est, lobortis ac augue at, vestibulum efficitur libero. Cras ut congue metus. Morbi vulputate tempor ante, eget ornare purus. Ut nec convallis neque. Donec dignissim ante ac nunc commodo, quis pellentesque nunc elementum. Vestibulum a ornare eros.

Praesent semper, nunc eu sollicitudin vestibulum, mauris dui ultrices enim, in iaculis velit sapien eget augue. Proin nibh libero, tincidunt et scelerisque et, interdum vitae dui. Nam bibendum luctus enim, vitae condimentum lorem sagittis ac. Donec sagittis orci ante, at molestie augue dapibus sed. Donec auctor, lectus vel laoreet efficitur, urna arcu dignissim nisl, nec lacinia justo risus eget dui. Donec at suscipit felis. Praesent at pretium elit. Vestibulum volutpat, metus et tempor pulvinar, orci lacus consectetur tortor, non laoreet dui erat non felis.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In gravida nulla dui, tincidunt ultrices odio commodo eu. Aenean finibus, nunc ut commodo molestie, felis ligula pulvinar ipsum, hendrerit cursus tortor orci a orci. Morbi dapibus gravida semper. Praesent placerat, lectus a molestie posuere, justo sem viverra erat, ut mattis ligula ante sed nulla. Morbi in sodales urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Mauris dignissim nec ante et euismod. Fusce ullamcorper augue enim, vel rhoncus urna vulputate eu. In pellentesque mi ut leo convallis interdum. Nulla quis suscipit justo, id iaculis eros. Sed pharetra, tortor ut convallis bibendum, nisi magna efficitur justo, vel vestibulum ex leo ut est. Fusce faucibus et lorem nec aliquam. Morbi id lacus neque. Nulla facilisi. In commodo justo vel velit tempus, sit amet aliquet tellus commodo. Vivamus rhoncus vehicula est, vel scelerisque nibh luctus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean scelerisque efficitur accumsan. Donec imperdiet lorem ac purus vulputate, et ornare neque tempor. Donec convallis molestie consectetur. Mauris lobortis dolor placerat dapibus accumsan. Curabitur condimentum sapien ut ex rutrum mattis.

Vestibulum dignissim rutrum nunc. Mauris a augue nec ipsum semper tempus. Praesent eget porta lacus. Donec congue nunc vel ligula pulvinar, sed lobortis turpis hendrerit. Aliquam porttitor ultricies nisl eget ultricies. Sed sed vulputate lectus. Phasellus venenatis felis sit amet diam condimentum, at suscipit velit porta. Fusce vestibulum rhoncus purus porttitor dictum. Vestibulum neque elit, faucibus et elit sed, laoreet commodo metus. Etiam vitae varius magna, eget ullamcorper lacus. Pellentesque sit amet faucibus nisl.

Quisque vitae diam imperdiet, consequat ligula ac, efficitur enim. In id nibh est. Sed id erat tellus. In vel consectetur enim. Donec lobortis nisi nunc, in vulputate eros maximus ut. Morbi consectetur quis lorem eu mattis. Nulla non tellus nisl. Suspendisse non lobortis diam. In vel sagittis neque, ac fermentum nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin semper dui a enim euismod, in bibendum ex malesuada. Proin ultricies lacus at lectus pretium, non placerat enim efficitur. Phasellus in orci ac ipsum vehicula condimentum. Morbi in ornare elit. In vehicula commodo metus eu consequat.

Praesent sed diam velit. Donec turpis augue, rhoncus vel laoreet sit amet, placerat quis felis. Duis sodales et metus quis placerat. Nam blandit, ante non dignissim ultrices, ante dolor malesuada nisl, at vulputate lorem elit sed mi. Maecenas lorem ante, cursus eu quam ac, volutpat vulputate elit. Phasellus sit amet lobortis erat, sit amet accumsan ipsum. Nulla lorem risus, lobortis at vestibulum quis, fringilla quis mauris. Pellentesque felis lectus, iaculis ut leo et, congue sollicitudin augue. Pellentesque dapibus, diam at dapibus efficitur, dolor neque pulvinar mauris, a fermentum dui turpis a nunc. Quisque est augue, condimentum sit amet ligula vitae, pharetra volutpat odio. Morbi dictum augue vehicula, fermentum risus eu, mattis nulla. Sed accumsan ligula sed interdum elementum. Nullam felis nunc, interdum ac odio quis, pellentesque placerat dolor. Integer et leo eget justo maximus laoreet ac eu diam. Nam velit turpis, volutpat in ultricies at, tempus ut justo.

Phasellus ullamcorper id dui a lacinia. Ut ac ligula ut sem iaculis gravida. Aenean a rhoncus eros, vitae cursus ex. Ut vel neque non massa semper ultricies. Etiam vulputate elementum nunc, sit amet pharetra diam ultrices ut. Donec ligula est, laoreet ut enim ac, molestie tristique erat. In aliquam gravida efficitur. Curabitur molestie mi ex, sed fermentum urna rutrum ultricies. Integer tempus mauris id lacinia tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras lobortis iaculis massa nec vestibulum. Maecenas tristique turpis id mi pharetra scelerisque. Maecenas elementum velit et massa interdum consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam semper felis at libero condimentum, vel finibus quam ornare. Suspendisse aliquet efficitur arcu et rutrum.

Quisque metus orci, interdum eget ultrices et, commodo eget nisl. Fusce cursus justo consectetur mattis sollicitudin. Praesent placerat elementum augue, a interdum quam egestas vitae. Suspendisse sit amet pretium metus, ut fermentum ipsum. Maecenas aliquam eget sem vitae porttitor. Aenean feugiat metus eu enim tincidunt condimentum. Fusce sed odio magna. Proin est orci, eleifend sed nibh vitae, facilisis commodo elit. Sed id pretium velit. Duis accumsan tortor augue, in condimentum est blandit et. Nullam bibendum sem velit, vel malesuada diam iaculis quis. Vivamus porttitor dictum ante, quis aliquam libero feugiat id.</p>

            </div>
        </div>
    )
};

export default Main;