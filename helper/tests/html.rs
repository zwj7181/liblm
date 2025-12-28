extern crate html5ever;
extern crate markup5ever_rcdom as rcdom;
use html5ever::interface::tree_builder::{ElementFlags, TreeSink};

use std::borrow::{Borrow, BorrowMut};
use std::fs::{File};
use std::io::{Write};
use std::marker::PhantomPinned;
use std::pin::Pin;
use std::rc::Rc;
use std::str::FromStr;

use html5ever::driver::ParseOpts;
use html5ever::tendril::{Tendril, TendrilSink};
use html5ever::tree_builder::TreeBuilderOpts;
use html5ever::{parse_document, serialize, QualName};
use rcdom::{Node, NodeData, RcDom, SerializableHandle};

#[test]
fn tt() {
    let opts = ParseOpts {
        tree_builder: TreeBuilderOpts {
            drop_doctype: true,
            ..Default::default()
        },
        ..Default::default()
    };
    let mut a = File::open("test.html").expect("open");
    let out_html = File::options()
        .create(true)
        .write(true)
        .open("out.html")
        .expect("oepn ");
    let mut dom = parse_document(RcDom::default(), opts)
        .from_utf8()
        .read_from(&mut a)
        .unwrap();

    let body_dom = get_body(&dom);

    for i in body_dom.children.borrow().iter() {
        if let NodeData::Element {
            name,
            attrs,
            template_contents,
            mathml_annotation_xml_integration_point,
        } = &i.data
        {
            if name.local.contains("script") {
                println!(" ================== {:?} {:?}", name.local, i.children);
            }
        }
    }
    let q = QualName::new(None, "ns".into(), "script".into());
    let f = ElementFlags::default();
    let _g = dom.create_element(q, vec![], f);

    {
        let mut gc = _g.children.borrow_mut();
        let t = Tendril::from_str("function dynamic_helper_check(){alert(123)}").unwrap();
        let t = NodeData::Text { contents: t.into() };
        let n = Node::new(t);
        gc.push(n);
    }

    dom.append(&body_dom, html5ever::tree_builder::AppendNode(_g));
    // dom.append(&dom.document, child);
    // The validator.nu HTML2HTML always prints a doctype at the very beginning.

    let document: SerializableHandle = dom.document.clone().into();
    serialize(out_html, &document, Default::default()).expect("serialization failed");
}

pub fn get_body(dom: &RcDom) -> Rc<Node> {
    let doc_c = dom.document.children.borrow();
    let plus_w = doc_c.first().unwrap();

    let plus_c = &plus_w.children.borrow();
    let body_dom = plus_c.last().unwrap();
    body_dom.to_owned()
}

// #[repr(C)]
struct S1 {
    a16: u16,
    a32: u32,
}
// #[repr(C)]
struct S2 {
    a32: u32,
    a16: u16,
}



#[derive(Debug)]
struct S {
    u: u32,
    _marker: PhantomPinned,
}
impl S {
    pub fn new() -> S {
        S {
            u: 0,
            _marker: PhantomPinned,
        }
    }
}
#[test]
fn t0() {
    let a = S::new();
    let mut a: Pin<Box<S>> = Box::pin(a);
    let a: Pin<&mut S> = a.as_mut();
    let a: &mut S = unsafe { a.get_unchecked_mut() };
    a.u = 99;
    println!("=> {:?}", a)
}
#[test]
fn t1() {
    let mut a = S::new();

    let a: Pin<&mut S> = unsafe { Pin::new_unchecked(&mut a) };
    let a: &mut S = unsafe { a.get_unchecked_mut() };
    a.u = 99;
    println!("=> {:?}", a)

}
#[test]
fn t2() {
    let mut a = 2;
    let a: Pin<&mut i32> = Pin::new(&mut a);
    let a: &mut i32 = a.get_mut();
}
